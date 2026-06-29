"use client";

import React, { useEffect, useRef, useState } from "react";

interface LineState {
  id: string;
  type: "h" | "v"; // horizontal or vertical
  coord: number; // percentage coordinate (10 to 90)
  delay: number;
}

const LINES: LineState[] = [
  // Horizontal lines - denser coordinates for square grid effect
  { id: "h-5", type: "h", coord: 5, delay: 0 },
  { id: "h-12", type: "h", coord: 12, delay: 100 },
  { id: "h-20", type: "h", coord: 20, delay: 200 },
  { id: "h-28", type: "h", coord: 28, delay: 300 },
  { id: "h-35", type: "h", coord: 35, delay: 400 },
  { id: "h-42", type: "h", coord: 42, delay: 500 },
  { id: "h-50", type: "h", coord: 50, delay: 600 },
  { id: "h-58", type: "h", coord: 58, delay: 700 },
  { id: "h-65", type: "h", coord: 65, delay: 800 },
  { id: "h-72", type: "h", coord: 72, delay: 900 },
  { id: "h-80", type: "h", coord: 80, delay: 1000 },
  { id: "h-88", type: "h", coord: 88, delay: 1100 },
  { id: "h-95", type: "h", coord: 95, delay: 1200 },

  // Vertical lines
  { id: "v-8", type: "v", coord: 8, delay: 1300 },
  { id: "v-16", type: "v", coord: 16, delay: 1400 },
  { id: "v-24", type: "v", coord: 24, delay: 1500 },
  { id: "v-32", type: "v", coord: 32, delay: 1600 },
  { id: "v-40", type: "v", coord: 40, delay: 1700 },
  { id: "v-48", type: "v", coord: 48, delay: 1800 },
  { id: "v-56", type: "v", coord: 56, delay: 1900 },
  { id: "v-64", type: "v", coord: 64, delay: 2000 },
  { id: "v-72", type: "v", coord: 72, delay: 2100 },
  { id: "v-80", type: "v", coord: 80, delay: 2200 },
  { id: "v-88", type: "v", coord: 88, delay: 2300 },
  { id: "v-96", type: "v", coord: 96, delay: 2400 },
];

export default function InteractiveGrid({ showGrid }: { showGrid: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Size of the container in pixels
  const [dimensions, setDimensions] = useState({ width: 1200, height: 600 });

  // Track the offset and the actual mouse drag point (ratio along the line 0.0 - 1.0)
  const [lineStates, setLineStates] = useState<Record<string, { offset: number; grabRatio: number }>>({});
  const [activeLine, setActiveLine] = useState<string | null>(null);

  // Animation values for path reveal
  const [revealProgress, setRevealProgress] = useState<Record<string, number>>({});

  const dragStartRef = useRef<{
    lineId: string;
    type: "h" | "v";
    startMouse: number;
    grabRatio: number;
  } | null>(null);

  // Keep dimensions in sync
  useEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: rect.height,
        });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Sequenced line entrance progress handler
  useEffect(() => {
    if (!showGrid) return;
    
    LINES.forEach((line) => {
      const timer = setTimeout(() => {
        let p = 0;
        const anim = () => {
          p += 0.04;
          if (p >= 1) {
            setRevealProgress((prev) => ({ ...prev, [line.id]: 1 }));
          } else {
            setRevealProgress((prev) => ({ ...prev, [line.id]: p }));
            requestAnimationFrame(anim);
          }
        };
        requestAnimationFrame(anim);
      }, line.delay);

      return () => clearTimeout(timer);
    });
  }, [showGrid]);

  const handleMouseDown = (lineId: string, type: "h" | "v", clientX: number, clientY: number) => {
    if (!showGrid || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    const mouseVal = type === "h" ? clientY : clientX;
    
    // Calculate where along the line the user grabbed (0.0 to 1.0)
    let grabRatio = 0.5;
    if (type === "h") {
      const relativeX = clientX - rect.left;
      grabRatio = Math.max(0, Math.min(1, relativeX / rect.width));
    } else {
      const relativeY = clientY - rect.top;
      grabRatio = Math.max(0, Math.min(1, relativeY / rect.height));
    }

    dragStartRef.current = {
      lineId,
      type,
      startMouse: mouseVal,
      grabRatio,
    };
    setActiveLine(lineId);
    setLineStates((prev) => ({
      ...prev,
      [lineId]: { offset: prev[lineId]?.offset || 0, grabRatio },
    }));
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragStartRef.current || !containerRef.current) return;
      const { lineId, type, startMouse } = dragStartRef.current;
      const rect = containerRef.current.getBoundingClientRect();
      
      const currentMouse = type === "h" ? e.clientY : e.clientX;
      const delta = currentMouse - startMouse;
      
      // Elastic string constraint
      const constrainedDelta = Math.max(-140, Math.min(140, delta));
      
      // Dynamically update grab ratio based on current cursor coordinate along the grid line
      let currentGrabRatio = 0.5;
      if (type === "h") {
        const relativeX = e.clientX - rect.left;
        currentGrabRatio = Math.max(0, Math.min(1, relativeX / rect.width));
      } else {
        const relativeY = e.clientY - rect.top;
        currentGrabRatio = Math.max(0, Math.min(1, relativeY / rect.height));
      }
      
      setLineStates((prev) => ({
        ...prev,
        [lineId]: { offset: constrainedDelta, grabRatio: currentGrabRatio },
      }));
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!dragStartRef.current || !containerRef.current || e.touches.length === 0) return;
      
      // Prevent screen scrolling when dragging interactive lines on mobile
      if (e.cancelable) {
        e.preventDefault();
      }

      const touch = e.touches[0];
      const { lineId, type, startMouse } = dragStartRef.current;
      const rect = containerRef.current.getBoundingClientRect();
      
      const currentMouse = type === "h" ? touch.clientY : touch.clientX;
      const delta = currentMouse - startMouse;
      
      const constrainedDelta = Math.max(-140, Math.min(140, delta));
      
      let currentGrabRatio = 0.5;
      if (type === "h") {
        const relativeX = touch.clientX - rect.left;
        currentGrabRatio = Math.max(0, Math.min(1, relativeX / rect.width));
      } else {
        const relativeY = touch.clientY - rect.top;
        currentGrabRatio = Math.max(0, Math.min(1, relativeY / rect.height));
      }
      
      setLineStates((prev) => ({
        ...prev,
        [lineId]: { offset: constrainedDelta, grabRatio: currentGrabRatio },
      }));
    };

    const handleRelease = () => {
      if (dragStartRef.current) {
        const { lineId, grabRatio } = dragStartRef.current;
        dragStartRef.current = null;
        setActiveLine(null);
        
        // Elastic rebound physics simulation
        let currentOffset = lineStates[lineId]?.offset || 0;
        let velocity = 0;
        const springK = 0.18; // spring constant (soft rebound)
        const friction = 0.88; // friction damping
        
        const springAnimate = () => {
          const force = -springK * currentOffset;
          velocity = (velocity + force) * friction;
          currentOffset += velocity;

          setLineStates((prev) => ({
            ...prev,
            [lineId]: { offset: currentOffset, grabRatio },
          }));

          if (Math.abs(currentOffset) > 0.05 || Math.abs(velocity) > 0.05) {
            requestAnimationFrame(springAnimate);
          } else {
            setLineStates((prev) => ({
              ...prev,
              [lineId]: { offset: 0, grabRatio: 0.5 },
            }));
          }
        };
        requestAnimationFrame(springAnimate);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleRelease);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleRelease);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleRelease);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleRelease);
    };
  }, [lineStates]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 pointer-events-auto z-0 overflow-hidden"
    >
      <svg className="w-full h-full" style={{ display: "block" }}>
        {LINES.map((line) => {
          const isH = line.type === "h";
          const progress = revealProgress[line.id] || 0;
          if (progress === 0) return null;

          const state = lineStates[line.id] || { offset: 0, grabRatio: 0.5 };
          const offset = state.offset;
          const grabRatio = state.grabRatio;
          const isActive = activeLine === line.id;
          
          // Compute static coordinate value in pixels
          const staticCoord = isH 
            ? (line.coord / 100) * dimensions.height 
            : (line.coord / 100) * dimensions.width;

          // Build SVG path string with quadratic bezier curves
          let pathD = "";
          
          if (isH) {
            // Horizontal Line
            const startX = 0;
            const startY = staticCoord;
            const endX = dimensions.width * progress;
            const endY = staticCoord;
            
            if (offset !== 0) {
              // Target grab coordinates
              const grabX = dimensions.width * grabRatio;
              const grabY = staticCoord + offset;
              
              // Quadratic bezier curve drawing from start to drag point to end
              pathD = `M ${startX} ${startY} Q ${grabX} ${grabY} ${endX} ${endY}`;
            } else {
              pathD = `M ${startX} ${startY} L ${endX} ${endY}`;
            }
          } else {
            // Vertical Line
            const startX = staticCoord;
            const startY = 0;
            const endX = staticCoord;
            const endY = dimensions.height * progress;
            
            if (offset !== 0) {
              // Target grab coordinates
              const grabX = staticCoord + offset;
              const grabY = dimensions.height * grabRatio;
              
              pathD = `M ${startX} ${startY} Q ${grabX} ${grabY} ${endX} ${endY}`;
            } else {
              pathD = `M ${startX} ${startY} L ${endX} ${endY}`;
            }
          }

          // Active string thickness scales to 2.5px while grab offset is present
          const strokeWidth = isActive ? 2.5 : 1.5;
          const strokeColor = isActive ? "rgba(16, 185, 129, 0.45)" : "rgba(16, 185, 129, 0.20)";

          return (
            <g key={line.id} className="group">
              {/* Invisible thick Hitbox Path (16px width) for easy grab targeting */}
              <path
                d={pathD}
                fill="none"
                stroke="transparent"
                strokeWidth={18}
                strokeLinecap="round"
                className="cursor-grab active:cursor-grabbing"
                style={{ pointerEvents: "stroke" }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleMouseDown(line.id, line.type, e.clientX, e.clientY);
                }}
                onTouchStart={(e) => {
                  // Prevent default scroll behavior while pulling grid lines
                  if (e.cancelable) e.preventDefault();
                  const touch = e.touches[0];
                  handleMouseDown(line.id, line.type, touch.clientX, touch.clientY);
                }}
              />
              
              {/* Visible styled line vector */}
              <path
                d={pathD}
                fill="none"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                className="pointer-events-none group-hover:stroke-emerald-500/50 transition-colors duration-300"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

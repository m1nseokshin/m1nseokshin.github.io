"use client";

import React, { useEffect, useRef } from "react";

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (window.innerWidth < 768) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const spacing = 40;
    let points: Point[][] = [];

    class Point {
      baseX: number;
      baseY: number;
      x: number;
      y: number;

      constructor(x: number, y: number) {
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
      }

      update(mousePos: { x: number; y: number }) {
        const time = Date.now() * 0.0015;
        const waveX = Math.sin(time + this.baseX * 0.006) * 6;
        const waveY = Math.cos(time + this.baseY * 0.006) * 6;
        const animBaseX = this.baseX + waveX;
        const animBaseY = this.baseY + waveY;

        const dx = mousePos.x - this.x;
        const dy = mousePos.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 280;

        if (dist < radius) {
          const force = (radius - dist) / radius;
          const angle = Math.atan2(dy, dx);
          const targetX = animBaseX - Math.cos(angle) * force * 35;
          const targetY = animBaseY - Math.sin(angle) * force * 35;

          this.x += (targetX - this.x) * 0.15;
          this.y += (targetY - this.y) * 0.15;
        } else {
          this.x += (animBaseX - this.x) * 0.08;
          this.y += (animBaseY - this.y) * 0.08;
        }
      }
    }

    const initGrid = () => {
      points = [];
      const cols = Math.floor(width / spacing) + 3;
      const rows = Math.floor(height / spacing) + 3;

      for (let c = 0; c < cols; c++) {
        points[c] = [];
        for (let r = 0; r < rows; r++) {
          points[c].push(new Point(c * spacing - 20, r * spacing - 20));
        }
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      initGrid();
    };

    window.addEventListener("resize", handleResize);
    initGrid();

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // Update points
      for (let c = 0; c < points.length; c++) {
        for (let r = 0; r < points[c].length; r++) {
          points[c][r].update(mouse);
        }
      }

      const spotlightRadius = 320;

      // Render horizontal & vertical lines near mouse with smooth fade
      for (let c = 0; c < points.length; c++) {
        for (let r = 0; r < points[c].length; r++) {
          const pt = points[c][r];

          // Horizontal segment
          if (c < points.length - 1) {
            const nextPt = points[c + 1][r];
            const midX = (pt.x + nextPt.x) / 2;
            const midY = (pt.y + nextPt.y) / 2;
            const dist = Math.hypot(midX - mouse.x, midY - mouse.y);

            if (dist < spotlightRadius) {
              const alpha = Math.pow(1 - dist / spotlightRadius, 1.8);
              ctx.strokeStyle = `rgba(16, 185, 129, ${alpha * 0.55})`;
              ctx.lineWidth = 1 + alpha * 1.6;
              ctx.beginPath();
              ctx.moveTo(pt.x, pt.y);
              ctx.lineTo(nextPt.x, nextPt.y);
              ctx.stroke();
            }
          }

          // Vertical segment
          if (r < points[c].length - 1) {
            const nextPt = points[c][r + 1];
            const midX = (pt.x + nextPt.x) / 2;
            const midY = (pt.y + nextPt.y) / 2;
            const dist = Math.hypot(midX - mouse.x, midY - mouse.y);

            if (dist < spotlightRadius) {
              const alpha = Math.pow(1 - dist / spotlightRadius, 1.8);
              ctx.strokeStyle = `rgba(16, 185, 129, ${alpha * 0.55})`;
              ctx.lineWidth = 1 + alpha * 1.6;
              ctx.beginPath();
              ctx.moveTo(pt.x, pt.y);
              ctx.lineTo(nextPt.x, nextPt.y);
              ctx.stroke();
            }
          }

          // Vertex dots near mouse
          const ptDist = Math.hypot(pt.x - mouse.x, pt.y - mouse.y);
          if (ptDist < spotlightRadius) {
            const alpha = Math.pow(1 - ptDist / spotlightRadius, 2);
            ctx.fillStyle = `rgba(16, 185, 129, ${alpha * 0.85})`;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 1.5 + alpha * 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current.targetX = e.clientX - rect.left;
    mouseRef.current.targetY = e.clientY - rect.top;
  };

  const handleMouseLeave = () => {
    mouseRef.current.targetX = -1000;
    mouseRef.current.targetY = -1000;
  };

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden hidden md:block"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block" 
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
}

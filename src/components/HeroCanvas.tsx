"use client";

import React, { useEffect, useRef, useState } from "react";

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

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

    const spacing = 45;
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
        const time = Date.now() * 0.0012;
        const waveX = Math.sin(time + this.baseX * 0.008) * 12;
        const waveY = Math.cos(time + this.baseY * 0.008) * 12;
        const animBaseX = this.baseX + waveX;
        const animBaseY = this.baseY + waveY;

        const dx = mousePos.x - this.x;
        const dy = mousePos.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 230; // 130% larger warping radius

        if (dist < radius) {
          const force = (radius - dist) / radius;
          const angle = Math.atan2(dy, dx);
          const targetX = animBaseX - Math.cos(angle) * force * 45;
          const targetY = animBaseY - Math.sin(angle) * force * 45;

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
      const cols = Math.floor(width / spacing) + 2;
      const rows = Math.floor(height / spacing) + 2;

      for (let c = 0; c < cols; c++) {
        points[c] = [];
        for (let r = 0; r < rows; r++) {
          points[c].push(new Point(c * spacing - 10, r * spacing - 10));
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

    const drawMesh = () => {
      ctx.clearRect(0, 0, width, height);

      // Update points using direct ref values (no state rebuild trigger)
      const currentMouse = mouseRef.current;
      for (let c = 0; c < points.length; c++) {
        for (let r = 0; r < points[c].length; r++) {
          points[c][r].update(currentMouse);
        }
      }

      ctx.strokeStyle = "rgba(3, 199, 90, 0.12)";
      ctx.lineWidth = 1;

      for (let c = 0; c < points.length; c++) {
        for (let r = 0; r < points[c].length; r++) {
          const pt = points[c][r];

          if (c < points.length - 1) {
            const nextPt = points[c + 1][r];
            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y);
            ctx.lineTo(nextPt.x, nextPt.y);
            ctx.stroke();
          }

          if (r < points[c].length - 1) {
            const nextPt = points[c][r + 1];
            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y);
            ctx.lineTo(nextPt.x, nextPt.y);
            ctx.stroke();
          }

          ctx.fillStyle = "rgba(3, 199, 90, 0.35)";
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(drawMesh);
    };

    drawMesh();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // Re-run 0 times!

  const handleMouseMove = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: -1000, y: -1000 };
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

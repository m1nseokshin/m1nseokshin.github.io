"use client";

import React, { useEffect, useRef } from "react";

interface ColorBlob {
  baseXRatio: number;
  baseYRatio: number;
  radiusRatio: number;
  speedX: number;
  speedY: number;
  hueOffset: number;
  phase: number;
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

    // 5 Living Ambient Gradient Blobs
    const blobs: ColorBlob[] = [
      { baseXRatio: 0.25, baseYRatio: 0.35, radiusRatio: 0.28, speedX: 0.7, speedY: 0.9, hueOffset: 0, phase: 0 },
      { baseXRatio: 0.75, baseYRatio: 0.40, radiusRatio: 0.32, speedX: 0.6, speedY: 0.8, hueOffset: 15, phase: 1.8 },
      { baseXRatio: 0.50, baseYRatio: 0.65, radiusRatio: 0.30, speedX: 0.8, speedY: 0.5, hueOffset: 28, phase: 3.4 },
      { baseXRatio: 0.20, baseYRatio: 0.75, radiusRatio: 0.26, speedX: 0.5, speedY: 0.7, hueOffset: 10, phase: 4.9 },
      { baseXRatio: 0.80, baseYRatio: 0.70, radiusRatio: 0.25, speedX: 0.9, speedY: 0.6, hueOffset: 20, phase: 2.3 },
    ];

    let isVisible = true;
    let animationFrameId: number;
    let time = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const inHeroSection = e.clientY >= rect.top && e.clientY <= rect.bottom;

      if (inHeroSection) {
        mouseRef.current.targetX = e.clientX - rect.left;
        mouseRef.current.targetY = e.clientY - rect.top;
      } else {
        mouseRef.current.targetX = -1000;
        mouseRef.current.targetY = -1000;
      }
    };

    const render = () => {
      if (!isVisible) return;

      ctx.clearRect(0, 0, width, height);
      time += 0.008;

      // Smooth mouse interpolation
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      const hasMouse = mouse.x > -500 && mouse.y > -500;

      // Render blobs
      blobs.forEach((blob) => {
        const idleX = width * blob.baseXRatio + Math.sin(time * blob.speedX + blob.phase) * (width * 0.12);
        const idleY = height * blob.baseYRatio + Math.cos(time * blob.speedY + blob.phase) * (height * 0.10);

        let finalX = idleX;
        let finalY = idleY;
        let currentRadius = Math.min(width, height) * blob.radiusRatio + Math.sin(time * 1.5 + blob.phase) * 25;

        if (hasMouse) {
          const dx = mouse.x - idleX;
          const dy = mouse.y - idleY;
          const dist = Math.hypot(dx, dy);
          const maxInfluence = 450;

          if (dist < maxInfluence) {
            const pull = Math.pow(1 - dist / maxInfluence, 1.6) * 140;
            finalX += (dx / dist) * pull;
            finalY += (dy / dist) * pull;
            currentRadius += (1 - dist / maxInfluence) * 60;
          }
        }

        const dynamicHue = 142 + blob.hueOffset + Math.sin(time * 0.5 + blob.phase) * 18;
        const alpha = 0.18 + Math.sin(time * 0.8 + blob.phase) * 0.04;

        const gradient = ctx.createRadialGradient(
          finalX,
          finalY,
          0,
          finalX,
          finalY,
          currentRadius
        );

        gradient.addColorStop(0, `hsla(${dynamicHue}, 85%, 55%, ${alpha})`);
        gradient.addColorStop(0.35, `hsla(${dynamicHue + 8}, 80%, 48%, ${alpha * 0.55})`);
        gradient.addColorStop(0.7, `hsla(${dynamicHue + 16}, 70%, 40%, ${alpha * 0.18})`);
        gradient.addColorStop(1, `hsla(${dynamicHue}, 60%, 35%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(finalX, finalY, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Mouse Spotlight Aura
      if (hasMouse) {
        const mouseSpotlightRadius = 360;
        const mouseHue = 150 + Math.sin(time * 0.6) * 15;

        const mouseGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouseSpotlightRadius
        );

        mouseGlow.addColorStop(0, `hsla(${mouseHue}, 90%, 60%, 0.22)`);
        mouseGlow.addColorStop(0.3, `hsla(${mouseHue - 10}, 85%, 50%, 0.10)`);
        mouseGlow.addColorStop(0.65, `hsla(${mouseHue - 20}, 75%, 40%, 0.025)`);
        mouseGlow.addColorStop(1, `hsla(${mouseHue}, 60%, 30%, 0)`);

        ctx.fillStyle = mouseGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouseSpotlightRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Pause rendering when scrolled out of view to save battery & GPU
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!isVisible) {
              isVisible = true;
              render();
            }
          } else {
            isVisible = false;
            cancelAnimationFrame(animationFrameId);
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(canvas);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisible = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        isVisible = true;
        render();
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleGlobalMouseMove);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden hidden md:block pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

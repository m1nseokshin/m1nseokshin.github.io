"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SwipeCarousel from "@/components/SwipeCarousel";

export default function WorkPage() {
  const artworksWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!artworksWrapperRef.current) return;
      const rect = artworksWrapperRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      
      // Calculate progress based on scroll position:
      // rect.top === vh (bottom of screen) -> progress = 0
      // rect.top <= 0 (top of screen / scrolled past) -> progress = 1
      let progress = (vh - rect.top) / vh;
      progress = Math.max(0, Math.min(1, progress));
      
      // Width expansion from 80% to 100%
      const width = 80 + progress * 20;
      artworksWrapperRef.current.style.width = `${width}%`;
      artworksWrapperRef.current.style.borderRadius = `${(1 - progress) * 32}px`;
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-white overflow-hidden">
      {/* Scroll Progress bar */}
      <div className="scroll-progress-container">
        <div className="scroll-progress-bar" id="scroll-bar" style={{ width: "0%" }}></div>
      </div>

      {/* 100vh Showcase Intro Section */}
      <section className="work-intro-section h-screen flex flex-col justify-center items-center text-center relative">
        <div className="container">
          <h1 className="work-intro-title text-7xl max-sm:text-5xl font-medium mb-6">
            디자인과 코드로 구현한<br />
            <span style={{ color: "var(--palette-accent-green)" }}>프로젝트 쇼케이스</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-[600px] mx-auto leading-relaxed">
            사용성과 심미성의 완벽한 조화를 목표로 제작한 다양한 프로젝트를 소개합니다.
          </p>
        </div>
        <div className="work-scroll-indicator absolute bottom-[15%] flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Scroll Down</span>
          <Image 
            src="/img/arrow_downward.svg" 
            alt="Scroll Down" 
            width={20} 
            height={20} 
            className="opacity-80"
          />
        </div>
      </section>

      {/* Full-Width Design Artworks Video Showcase */}
      <section id="project-artworks" className="artworks-video-section w-full">
        <div 
          ref={artworksWrapperRef}
          className="artworks-video-wrapper relative w-[80%] mx-auto h-screen overflow-hidden transition-all duration-300"
        >
          <video 
            src="/video/main.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover block"
          />
          <div className="artworks-video-overlay absolute inset-0 bg-gradient-to-b from-slate-900/40 to-slate-900/80 z-[1]"></div>
          <div className="artworks-video-content absolute bottom-[10%] left-[10%] right-[10%] z-[2] max-w-[700px] text-white">
            <h3 className="artworks-video-title text-4xl max-sm:text-3xl font-bold mb-5">Design Artworks</h3>
            <p className="artworks-video-desc text-lg text-slate-300 leading-relaxed mb-8">
              각종 디자인 작업물들이 모인 사이트입니다.
            </p>
            <a 
              href="https://m1nseokartworks.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn artworks-visit-btn bg-white text-slate-950 font-semibold hover:bg-gray-100"
            >
              사이트 방문
            </a>
          </div>
        </div>
      </section>

      {/* Showcase Section: Swipe Carousel */}
      <section id="work-showcase" className="projects-section" style={{ paddingTop: "60px", paddingBottom: "60px" }}>
        <div className="container">
          <SwipeCarousel />
        </div>
      </section>
    </main>
  );
}

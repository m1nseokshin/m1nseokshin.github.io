"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard, A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/keyboard";
import "swiper/css/a11y";

import { useLanguage } from "@/context/LanguageContext";
import defaultProjects from "@/data/projects.json";

export interface Project {
  id?: string;
  index: number;
  tag: string;
  titleKo: string;
  titleEn: string;
  descKo: string;
  descEn: string;
  url: string;
  img: string;
  isAward?: boolean;
  awardTextKo?: string;
  awardTextEn?: string;
}

export default function SwipeCarousel() {
  const { lang } = useLanguage();
  const [projects, setProjects] = useState<Project[]>(defaultProjects as Project[]);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  // Smooth fade transition for info block text
  const [infoFade, setInfoFade] = useState(true);

  useEffect(() => {
    // Fetch dynamic project list from API or localStorage
    const fetchProjects = async () => {
      try {
        const local = localStorage.getItem("portfolio_projects");
        if (local) {
          setProjects(JSON.parse(local));
        }

        const res = await fetch("/api/projects");
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setProjects(data.data);
          localStorage.setItem("portfolio_projects", JSON.stringify(data.data));
        }
      } catch (err) {
        console.error("Failed to load projects from API, using fallback data", err);
      }
    };

    fetchProjects();
  }, []);

  const activeProject = projects[activeIndex] || projects[0] || (defaultProjects[0] as Project);
  
  const info = {
    tag: activeProject?.tag || "",
    title: lang === "ko" ? activeProject?.titleKo : activeProject?.titleEn,
    desc: lang === "ko" ? activeProject?.descKo : activeProject?.descEn,
    url: activeProject?.url || "",
    isAward: activeProject?.isAward,
    awardText: lang === "ko" ? activeProject?.awardTextKo : activeProject?.awardTextEn,
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setInfoFade(false);
    setTimeout(() => {
      setActiveIndex(swiper.activeIndex);
      setInfoFade(true);
    }, 150);
  };

  const handlePrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  const handleCardClick = (index: number, url: string) => {
    if (index === activeIndex) {
      window.open(url, "_blank");
    } else if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  return (
    <div className="w-full relative">
      {/* ── Swiper Slider ── */}
      <div className="swipe-carousel-container-outer overflow-hidden">
        <Swiper
          modules={[Navigation, Keyboard, A11y]}
          keyboard={{ enabled: true, onlyInViewport: true }}
          a11y={{ prevSlideMessage: 'Previous project', nextSlideMessage: 'Next project' }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={handleSlideChange}
          speed={500}
          grabCursor={true}
          breakpoints={{
            0: {
              slidesPerView: 1.06,
              spaceBetween: 28,
              centeredSlides: true,
            },
            1024: {
              slidesPerView: 1.25,
              spaceBetween: 24,
              slidesOffsetBefore: 100,
              centeredSlides: false,
            },
          }}
          className="mySwiper w-full py-2"
        >
          {projects.map((project, idx) => (
            <SwiperSlide key={project.id || project.index || idx} className="transition-all duration-500 w-full">
              <div
                onClick={() => handleCardClick(idx, project.url)}
                className={`swipe-card w-full block rounded-2xl overflow-hidden border border-gray-100 transition-all duration-500 cursor-pointer relative group
                  ${idx === activeIndex ? "opacity-100 scale-100 active" : "opacity-60 scale-[0.97]"}`}
              >
                <div className="swipe-card-media-wrapper relative w-full h-[52vh] min-h-[400px] max-h-[600px] max-lg:h-[54vw] max-lg:min-h-[320px] max-sm:h-[65vw] max-sm:min-h-[260px] overflow-hidden rounded-2xl">
                  <Image
                    src={project.img || "/img/p_01.png"}
                    alt={lang === "ko" ? project.titleKo : project.titleEn}
                    fill
                    unoptimized
                    quality={100}
                    className="object-cover w-full h-full block"
                    style={{ filter: "brightness(0.97)" }}
                    priority={idx === 0}
                  />

                  {/* Award Tag */}
                  {project.isAward && (
                    <div className="absolute top-5 left-5 z-20 px-3.5 py-1.5 rounded-lg bg-black/60 text-white backdrop-blur-md text-[11px] font-medium tracking-wider uppercase border border-white/10">
                      {lang === "ko" ? (project.awardTextKo || "우수상") : (project.awardTextEn || "Excellence Award")}
                    </div>
                  )}

                  {idx === activeIndex && (
                    <div className="max-lg:hidden">
                      <ActiveCardFollower projectUrl={project.url} lang={lang} />
                    </div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ── Info panel ── */}
      <div className="mt-5 pr-4 lg:pr-6 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-0 lg:gap-8 lg:pl-[100px]">
        {/* Text block */}
        <div
          className="transition-opacity duration-300"
          style={{ opacity: infoFade ? 1 : 0 }}
        >
          {/* Tag & Award Info */}
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <p className="text-[11px] font-medium text-slate-400 tracking-wide uppercase">
              {info.tag}
            </p>
            {info.isAward && (
              <>
                <span className="text-slate-300 text-xs">·</span>
                <span className="text-[11px] font-semibold text-emerald-600 tracking-wider uppercase">
                  {info.awardText || (lang === "ko" ? "우수상" : "Excellence Award")}
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="text-[17px] font-semibold text-slate-900 mb-1.5 leading-snug">
            {info.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-500 leading-normal max-w-[460px]">
            {info.desc}
          </p>

          {/* Visit link — compact screens only */}
          <a
            href={info.url}
            target="_blank"
            rel="noopener noreferrer"
            className="lg:hidden inline-flex items-center gap-1 text-sm font-semibold text-slate-900 mt-3"
          >
            {lang === "ko" ? "사이트 방문" : "Visit Site"}
            <svg
              width="14" height="14"
              viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </a>
        </div>

        {/* Nav buttons */}
        <div className="flex gap-2 flex-shrink-0 lg:pt-0.5 max-lg:justify-center max-lg:mt-6">
          <button
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className="w-10 h-10 rounded-full border border-gray-200 bg-white text-slate-800
              flex items-center justify-center cursor-pointer
              transition-all duration-300 hover:bg-gray-50
              disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label={lang === "ko" ? "이전" : "Previous"}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            disabled={activeIndex === projects.length - 1}
            className="w-10 h-10 rounded-full border border-gray-200 bg-white text-slate-800
              flex items-center justify-center cursor-pointer
              transition-all duration-300 hover:bg-gray-50
              disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label={lang === "ko" ? "다음" : "Next"}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── ActiveCardFollower (desktop cursor pill) ──
function ActiveCardFollower({ projectUrl, lang }: { projectUrl: string; lang: "ko" | "en" }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="absolute inset-0 z-10 w-full h-full cursor-none overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-black/40 transition-opacity duration-300"
        style={{ opacity: isHovered ? 1 : 0 }}
      />

      {isHovered && (
        <div
          className="pointer-events-none absolute rounded-full bg-white text-black
            flex items-center gap-2 px-5 shadow-lg z-30"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            height: "48px",
            transform: "translate(-50%, -50%)",
            transition: "left 0.05s ease-out, top 0.05s ease-out",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
          <span className="text-xs font-semibold whitespace-nowrap">
            {lang === "ko" ? "사이트 방문" : "Visit Site"}
          </span>
        </div>
      )}
    </div>
  );
}

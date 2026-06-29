"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

interface Project {
  index: number;
  tag: string;
  title: string;
  desc: string;
  url: string;
  img: string;
}

const PROJECTS: Project[] = [
  {
    index: 0,
    tag: "Next.js & Design",
    title: "Mazda RX-7 자동차 소개 사이트",
    desc: "Next.js 기반 RX-7 스포츠카 소개 웹사이트. 물리 엔진 효과와 스크롤 그래픽을 결합한 시각적 경험을 제공합니다.",
    url: "https://mazda-rx-7.vercel.app",
    img: "/img/p_01.png",
  },
  {
    index: 1,
    tag: "Vue.js & UX Design",
    title: "Styles 가구 판매 쇼핑몰",
    desc: "Vue.js 기반 가구 이커머스 플랫폼. 모던하고 편안한 인테리어 브라우징 UX를 설계했습니다.",
    url: "https://m1nseokshin.github.io/Styles",
    img: "/img/p_02.png",
  },
  {
    index: 2,
    tag: "TypeScript & Next.js",
    title: "대구도시철도 검색 사이트",
    desc: "Next.js와 TypeScript로 구현한 경량 검색 웹 서비스. 타이핑 즉시 결과가 노출되는 실시간 필터링을 지원합니다.",
    url: "https://daegusubway.vercel.app/",
    img: "/img/p_03.png",
  },
  {
    index: 3,
    tag: "Web Design & Frontend Development",
    title: "대구가톨릭대학교 2023년 2학기 과제전 사이트",
    desc: "대구가톨릭대학교 디지털디자인과 2023년 2학기 온라인 과제전 웹사이트. 해당 프로젝트의 웹 디자인 및 전체 프론트엔드 개발을 단독 담당하였습니다.",
    url: "http://dxd.cu.ac.kr/showcase232/",
    img: "/img/p_04.png",
  },
];

export default function SwipeCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  // Transition state for info panel
  const [info, setInfo] = useState(PROJECTS[0]);
  const [infoFade, setInfoFade] = useState(true);

  const handleSlideChange = (swiper: SwiperType) => {
    const nextIndex = swiper.activeIndex;
    setActiveIndex(nextIndex);
    setInfoFade(false);
    setTimeout(() => {
      setInfo(PROJECTS[nextIndex]);
      setInfoFade(true);
    }, 250);
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
          modules={[Navigation]}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={handleSlideChange}
          speed={500}
          grabCursor={true}
          // Responsive params to mimic your desktop peek + mobile full-width design
          breakpoints={{
            // Mobile & Tablet (< 1024px): Sized to show single card prominently with wider gap
            0: {
              slidesPerView: 1.06,
              spaceBetween: 28,
              centeredSlides: true,
            },
            // Desktop (>= 1024px): 78% card width, showing peeking cards aligned to left margin
            1024: {
              slidesPerView: 1.25,
              spaceBetween: 24,
              slidesOffsetBefore: 100, // Matches startOffsetPx (100px)
              centeredSlides: false,
            },
          }}
          className="mySwiper w-full py-2"
        >
          {PROJECTS.map((project, idx) => (
            <SwiperSlide key={project.index} className="transition-all duration-500 w-full">
              <div
                onClick={() => handleCardClick(idx, project.url)}
                className={`swipe-card w-full block rounded-2xl overflow-hidden border border-gray-100 transition-all duration-500 cursor-pointer
                  ${idx === activeIndex ? "opacity-100 scale-100 active" : "opacity-60 scale-[0.97]"}`}
              >
                <div className="swipe-card-media-wrapper relative w-full h-[43vh] max-lg:h-[50vw] max-sm:h-[38vw] overflow-hidden rounded-2xl">
                  <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    unoptimized
                    quality={100}
                    className="object-cover w-full h-full block"
                    style={{ filter: "brightness(0.97)" }}
                    priority={idx === 0}
                  />
                  {idx === activeIndex && (
                    <div className="max-lg:hidden">
                      <ActiveCardFollower projectUrl={project.url} />
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
          {/* Tag — compact screens only */}
          <p className="lg:hidden text-[11px] font-medium text-slate-400 tracking-wide mb-1.5 uppercase">
            {info.tag}
          </p>

          {/* Title */}
          <h3 className="text-[15px] font-semibold text-slate-900 mb-1.5 leading-snug">
            {info.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-500 leading-normal max-w-[420px]">
            {info.desc}
          </p>

          {/* Visit link — compact screens only */}
          <a
            href={info.url}
            target="_blank"
            rel="noopener noreferrer"
            className="lg:hidden inline-flex items-center gap-1 text-sm font-semibold text-slate-900 mt-3"
          >
            사이트 방문
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

        {/* Nav buttons — right side on desktop, centered below on compact */}
        <div className="flex gap-2 flex-shrink-0 lg:pt-0.5 max-lg:justify-center max-lg:mt-6">
          <button
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className="w-10 h-10 rounded-full border border-gray-200 bg-white text-slate-800
              flex items-center justify-center cursor-pointer
              transition-all duration-300 hover:bg-gray-50
              disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="이전"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            disabled={activeIndex === PROJECTS.length - 1}
            className="w-10 h-10 rounded-full border border-gray-200 bg-white text-slate-800
              flex items-center justify-center cursor-pointer
              transition-all duration-300 hover:bg-gray-50
              disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="다음"
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
function ActiveCardFollower({ projectUrl }: { projectUrl: string }) {
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
      {/* Dim overlay */}
      <div
        className="absolute inset-0 bg-black/40 transition-opacity duration-300"
        style={{ opacity: isHovered ? 1 : 0 }}
      />

      {/* Floating pill: arrow + label */}
      {isHovered && (
        <div
          className="pointer-events-none absolute rounded-full bg-white text-black
            flex items-center gap-2 px-5 shadow-lg"
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
          <span className="text-xs font-semibold whitespace-nowrap">사이트 방문</span>
        </div>
      )}
    </div>
  );
}

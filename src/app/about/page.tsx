"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import TypingTitle from "@/components/TypingTitle";
import ScrollReveal from "@/components/ScrollReveal";
import InteractiveGrid from "@/components/InteractiveGrid";

export default function AboutPage() {
  const [showGrid, setShowGrid] = useState(false);

  return (
    <main className="relative min-h-screen w-full bg-white overflow-hidden">
      {/* Scroll Progress bar */}
      <div className="scroll-progress-container">
        <div className="scroll-progress-bar" id="scroll-bar" style={{ width: "0%" }}></div>
      </div>

      {/* Profile Hero: Typing Greeting Only (100vh) */}
      <section id="profile" className="about-hero-section h-screen flex items-center bg-white relative overflow-hidden">
        {/* Animated interactive elastic guitar grid lines overlay */}
        <InteractiveGrid showGrid={showGrid} />

        <div className="container relative z-10 pointer-events-none text-center lg:text-left">
          <div className="pointer-events-auto inline-block w-full text-center lg:text-left">
            <TypingTitle
              part1="안녕하세요!\n"
              part2="예비 UX 디자이너 "
              part3="신민석입니다."
              className="profile-greeting-title"
              speed={65}
              onComplete={() => setShowGrid(true)}
            />
          </div>
        </div>
        {/* Floating guide hint helper at 85vh (bottom 15%) without shadow and English label */}
        <div 
          className={`absolute bottom-[15%] left-1/2 -translate-x-1/2 z-10 transition-all duration-1000 ease-out select-none pointer-events-none ${showGrid ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          suppressHydrationWarning
        >
          <span className="text-xs font-medium text-slate-400 bg-slate-50/90 py-1.5 px-4 rounded-full border border-slate-100" suppressHydrationWarning>
            선을 잡아보세요!
          </span>
        </div>
      </section>

      {/* Profile Details Section with safe top-padding offset */}
      <section className="about-details-section">
        <div className="container">
          <div className="about-profile-grid">
            
            {/* Left: Description & Details */}
            <div className="about-left-column">
              <div className="about-desc-block mb-12">
                <p className="about-desc-main text-2xl font-medium mb-6 leading-normal">
                  현재 부산대학교 디자인학과 디자인테크놀로지전공에 재학하며, 디자인과 기술의 조화를 고민합니다.
                </p>
                <p className="about-desc-sub text-base text-gray-500 leading-relaxed">
                  HCI를 핵심적으로 연구하여 모든 사람들이 더 나은 경험을 할 수 있도록 만드는 것을 지향합니다.
                </p>
              </div>
              <div className="profile-details-list flex flex-col gap-4 border-t border-gray-100 pt-8">
                <div className="profile-detail-item flex text-base leading-normal">
                  <span className="detail-label flex-[0_0_120px] font-semibold">학적</span>
                  <span className="detail-val text-gray-500">부산대학교 예술대학 디자인학과 디자인테크놀로지전공 재학 (2026.03 ~)</span>
                </div>
                <div className="profile-detail-item flex text-base leading-normal">
                  <span className="detail-label flex-[0_0_120px] font-semibold">관심분야</span>
                  <span className="detail-val text-gray-500">HCI / Web Development</span>
                </div>
              </div>
            </div>
            
            {/* Right: Profile Image Card */}
            <div className="about-right-column">
              <div className="profile-image-card">
                <Image 
                  src="/img/profile.png" 
                  alt="신민석 프로필"
                  width={280}
                  height={280}
                  priority
                />
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Journey & Education Section */}
      <ScrollReveal className="py-section px-4" threshold={0.25}>
        <section id="experience" className="experience-section rounded-[32px] py-16 sm:py-24 px-8 sm:px-16" style={{ backgroundColor: "var(--palette-grey-10)" }}>
          <div className="container max-w-[900px]">
            <div className="section-header text-center mb-[64px]">
              <p className="section-label">Journey & Education</p>
              <h2 className="section-title">활동 및 경험</h2>
            </div>
            
            <div className="experience-list flex flex-col gap-6">
              <div 
                className="experience-item p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 transition-transform duration-300 hover:-translate-y-0.5"
                style={{ backgroundColor: "var(--theme-surface-surface)", border: "1px solid var(--theme-outline-variant)" }}
              >
                <h3 className="exp-title text-lg font-semibold">Korea Design Membership Plus 7기</h3>
                <span className="exp-date text-sm" style={{ color: "var(--theme-surface-on-surface-variant)" }}>2026.04 ~ 현재 진행 중</span>
              </div>
              <div 
                className="experience-item p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 transition-transform duration-300 hover:-translate-y-0.5"
                style={{ backgroundColor: "var(--theme-surface-surface)", border: "1px solid var(--theme-outline-variant)" }}
              >
                <h3 className="exp-title text-lg font-semibold">Travel Busan With Google Gemini 서포터즈</h3>
                <span className="exp-date text-sm" style={{ color: "var(--theme-surface-on-surface-variant)" }}>2026.06</span>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Skills Stack Section */}
      <section id="skills" className="skills-section py-section">
        <div className="container">
          <div className="section-header text-center mb-[64px]">
            <p className="section-label">Capabilities</p>
            <h2 className="section-title">운용 툴 및 개발 기술 스택</h2>
          </div>
          
          <div className="skills-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* AI Stacks */}
            <div className="skills-card rounded-3xl p-8 shadow-sm transition-all duration-500 hover:-translate-y-1">
              <h3 className="skills-card-title text-xl font-semibold mb-6">AI Stacks</h3>
              <div className="skills-tag-container flex flex-wrap gap-2.5">
                <span className="skill-tag text-xs font-medium py-2 px-3.5 rounded transition-all duration-500 hover:-translate-y-0.5">Google Gemini (Antigravity)</span>
                <span className="skill-tag text-xs font-medium py-2 px-3.5 rounded transition-all duration-500 hover:-translate-y-0.5">Chat-gpt (CodeX)</span>
                <span className="skill-tag text-xs font-medium py-2 px-3.5 rounded transition-all duration-500 hover:-translate-y-0.5">Claude</span>
                <span className="skill-tag text-xs font-medium py-2 px-3.5 rounded transition-all duration-500 hover:-translate-y-0.5">Seedance 2.0</span>
              </div>
            </div>
            
            {/* Tech Stacks */}
            <div className="skills-card rounded-3xl p-8 shadow-sm transition-all duration-500 hover:-translate-y-1">
              <h3 className="skills-card-title text-xl font-semibold mb-6">Tech Stacks</h3>
              <div className="skills-tag-container flex flex-wrap gap-2.5">
                <span className="skill-tag text-xs font-medium py-2 px-3.5 rounded transition-all duration-500 hover:-translate-y-0.5">HTML5</span>
                <span className="skill-tag text-xs font-medium py-2 px-3.5 rounded transition-all duration-500 hover:-translate-y-0.5">CSS</span>
                <span className="skill-tag text-xs font-medium py-2 px-3.5 rounded transition-all duration-500 hover:-translate-y-0.5">Javascript</span>
                <span className="skill-tag text-xs font-medium py-2 px-3.5 rounded transition-all duration-500 hover:-translate-y-0.5">Node.js</span>
                <span className="skill-tag text-xs font-medium py-2 px-3.5 rounded transition-all duration-500 hover:-translate-y-0.5">Next.js</span>
                <span className="skill-tag text-xs font-medium py-2 px-3.5 rounded transition-all duration-500 hover:-translate-y-0.5">JAVA</span>
                <span className="skill-tag text-xs font-medium py-2 px-3.5 rounded transition-all duration-500 hover:-translate-y-0.5">Android Studio (JAVA)</span>
                <span className="skill-tag text-xs font-medium py-2 px-3.5 rounded transition-all duration-500 hover:-translate-y-0.5">Python</span>
                <span className="skill-tag text-xs font-medium py-2 px-3.5 rounded transition-all duration-500 hover:-translate-y-0.5">Processing</span>
              </div>
            </div>
            
            {/* Design Stacks */}
            <div className="skills-card rounded-3xl p-8 shadow-sm transition-all duration-500 hover:-translate-y-1">
              <h3 className="skills-card-title text-xl font-semibold mb-6">Design Stacks</h3>
              <div className="skills-tag-container flex flex-wrap gap-2.5">
                <span className="skill-tag text-xs font-medium py-2 px-3.5 rounded transition-all duration-500 hover:-translate-y-0.5">Figma</span>
                <span className="skill-tag text-xs font-medium py-2 px-3.5 rounded transition-all duration-500 hover:-translate-y-0.5">Adobe Illustrator</span>
                <span className="skill-tag text-xs font-medium py-2 px-3.5 rounded transition-all duration-500 hover:-translate-y-0.5">Adobe Photoshop</span>
                <span className="skill-tag text-xs font-medium py-2 px-3.5 rounded transition-all duration-500 hover:-translate-y-0.5">Adobe Premiere Pro</span>
                <span className="skill-tag text-xs font-medium py-2 px-3.5 rounded transition-all duration-500 hover:-translate-y-0.5">Blender</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

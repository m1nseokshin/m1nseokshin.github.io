"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import TypingTitle from "@/components/TypingTitle";
import ScrollReveal from "@/components/ScrollReveal";
import InteractiveGrid from "@/components/InteractiveGrid";

import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { lang } = useLanguage();
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
              key={lang}
              part1={lang === "ko" ? "안녕하세요!\n" : "Hello!\n"}
              part2={lang === "ko" ? "예비 UX 디자이너 " : "I'm UX Designer & Dev "}
              part3={lang === "ko" ? "신민석입니다." : "Minseok Shin."}
              className="profile-greeting-title"
              speed={65}
              onComplete={() => setShowGrid(true)}
            />
          </div>
        </div>
        {/* Floating guide hint helper */}
        <div 
          className={`absolute bottom-[15%] left-1/2 -translate-x-1/2 z-10 transition-all duration-1000 ease-out select-none pointer-events-none ${showGrid ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          suppressHydrationWarning
        >
          <span className="text-xs font-medium text-slate-400 bg-slate-50/90 py-1.5 px-4 rounded-full border border-slate-100" suppressHydrationWarning>
            {lang === "ko" ? "선을 잡아보세요!" : "Try plucking the lines!"}
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
                  {lang === "ko"
                    ? "현재 부산대학교 디자인학과 디자인앤테크놀로지전공에 재학하며, 디자인과 기술의 조화를 고민합니다."
                    : "Currently studying Design & Technology at Pusan National University, pursuing the harmony between design and tech."}
                </p>
                <p className="about-desc-sub text-base text-gray-500 leading-relaxed">
                  {lang === "ko"
                    ? "HCI를 핵심적으로 연구하여 모든 사람들이 더 나은 경험을 할 수 있도록 만드는 것을 지향합니다."
                    : "Focusing on HCI research to build accessible and meaningful user experiences for everyone."}
                </p>
              </div>
              <div className="profile-details-list flex flex-col gap-4 border-t border-gray-100 pt-8">
                <div className="profile-detail-item flex text-base leading-normal">
                  <span className="detail-label flex-[0_0_120px] font-semibold">
                    {lang === "ko" ? "학적" : "Education"}
                  </span>
                  <span className="detail-val text-gray-500">
                    {lang === "ko"
                      ? "부산대학교 예술대학 디자인학과 디자인앤테크놀로지전공 재학 (2026.03 ~)"
                      : "Pusan National Univ. Dept. of Design (Design & Technology) (2026.03 ~)"}
                  </span>
                </div>
                <div className="profile-detail-item flex text-base leading-normal">
                  <span className="detail-label flex-[0_0_120px] font-semibold">
                    {lang === "ko" ? "관심분야" : "Interests"}
                  </span>
                  <span className="detail-val text-gray-500">HCI / Web Development</span>
                </div>
              </div>
            </div>
            
            {/* Right: Profile Image Card */}
            <div className="about-right-column flex justify-end max-lg:justify-center">
              <div className="profile-image-card ml-auto max-lg:ml-0">
                <Image 
                  src="/img/profile.png" 
                  alt={lang === "ko" ? "신민석 프로필" : "Minseok Shin Profile"}
                  width={280}
                  height={280}
                  priority
                />
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Journey & Experience Section */}
      <ScrollReveal className="py-section px-4" threshold={0.25}>
        <section id="experience" className="experience-section rounded-[32px] py-16 sm:py-24 px-8 sm:px-16" style={{ backgroundColor: "var(--palette-grey-10)" }}>
          <div className="container max-w-[900px]">
            <div className="section-header text-center mb-[64px]">
              <p className="section-label">Journey & Experience</p>
              <h2 className="section-title">
                {lang === "ko" ? "활동 및 경험" : "Activities & Experience"}
              </h2>
            </div>
            
            <div className="experience-list flex flex-col gap-6">
              <div 
                className="experience-item p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 transition-transform duration-300 hover:-translate-y-0.5"
                style={{ backgroundColor: "var(--theme-surface-surface)", border: "1px solid var(--theme-outline-variant)" }}
              >
                <div>
                  <h3 className="exp-title text-lg font-semibold text-slate-900">
                    {lang === "ko" ? "Korea Design Membership Plus 7기" : "Korea Design Membership Plus (7th Cohort)"}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {lang === "ko" ? "산업통상자원부 & 한국디자인진흥원 주관 디자인 멤버십" : "Design membership by MOTIE & Korea Institute of Design Promotion"}
                  </p>
                </div>
                <span className="exp-date text-sm font-medium shrink-0 text-slate-400">
                  {lang === "ko" ? "2026.04 ~ 현재 진행 중" : "2026.04 ~ Present"}
                </span>
              </div>
              <div 
                className="experience-item p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 transition-transform duration-300 hover:-translate-y-0.5"
                style={{ backgroundColor: "var(--theme-surface-surface)", border: "1px solid var(--theme-outline-variant)" }}
              >
                <div>
                  <h3 className="exp-title text-lg font-semibold text-slate-900">
                    {lang === "ko" ? "Travel Busan With Google Gemini 서포터즈" : "Travel Busan With Google Gemini Supporters"}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {lang === "ko" ? "Google AI 기술을 활용한 부산 관광 인터랙티브 콘텐츠 기획" : "Interactive Busan tourism content creation with Google AI"}
                  </p>
                </div>
                <span className="exp-date text-sm font-medium shrink-0 text-slate-400">2026.06</span>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Awards & Honors Section */}
      <ScrollReveal className="py-section px-4" threshold={0.25}>
        <section id="awards" className="awards-section">
          <div className="container max-w-[900px]">
            <div className="section-header text-center mb-[64px]">
              <p className="section-label">Honors & Recognition</p>
              <h2 className="section-title">
                {lang === "ko" ? "수상 이력" : "Awards & Honors"}
              </h2>
            </div>

            <div className="awards-list flex flex-col gap-6">
              {/* Award 1: Spark Gold Winner */}
              <div 
                className="award-card p-6 sm:p-8 rounded-2xl border border-gray-100 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-gray-200 transition-all duration-300 flex flex-col justify-between gap-6"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-2 flex-wrap">
                    <span className="text-xs font-semibold text-emerald-600 tracking-wider uppercase">
                      2026 Spark Design Awards
                    </span>
                    <span className="text-xs font-medium text-slate-400">2026</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
                    Gold Winner
                  </h3>
                  <p className="text-base font-medium text-slate-600 mb-3">
                    2026 Spark: Spring Student - ReNest
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    {lang === "ko" 
                      ? "산불 피해 지역 생태계의 자연 복원을 돕는 생분해성 조류 서식지 시스템 디자인 프로젝트."
                      : "A biodegradable nest habitat system promoting natural ecological restoration after wildfires."}
                  </p>
                  <p className="text-xs text-slate-400">
                    {lang === "ko" ? "팀원: 손민호, 이지원, 김지수, 신민석 (KDM+)" : "Team: Minho Son, Ji Won Lee, Ji Su Kim, Minseok Shin (KDM+)"}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Official Award Gallery</span>
                  <a
                    href="https://galleries.sparkawards.com/gallery?year=2026&comp=1107&entry=0bacc4cb-432d-4ea1-aedf-cee3e3e63ce&search=Renest"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 hover:text-emerald-600 transition-colors"
                  >
                    <span>{lang === "ko" ? "공식 갤러리 보기" : "View Official Gallery"}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Award 2: 2026 KDM+ AI Workshop Award */}
              <div 
                className="award-card p-6 sm:p-8 rounded-2xl border border-gray-100 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-gray-200 transition-all duration-300 flex flex-col justify-between gap-6"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-2 flex-wrap">
                    <span className="text-xs font-semibold text-emerald-600 tracking-wider uppercase">
                      Korea Design Membership Plus
                    </span>
                    <span className="text-xs font-medium text-slate-400">2026.08</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
                    {lang === "ko" ? "우수상" : "Excellence Award"}
                  </h3>
                  <p className="text-base font-medium text-slate-600 mb-3">
                    {lang === "ko"
                      ? "2026 KDM+ 생성형 AI 디자인 실무 워크숍 - Rally"
                      : "2026 KDM+ Generative AI Design Workshop - Rally"}
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    {lang === "ko" 
                      ? "음악의 리듬과 탁구의 랠리를 결합한 XR 기반 리듬 스포츠 플랫폼 'Rally' 프로젝트."
                      : "XR-based rhythm table tennis sports platform project 'Rally' combining music and sport rallies."}
                  </p>
                  <p className="text-xs text-slate-400">
                    Project: Rally (XR Rhythm Sports Platform)
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Presentation Showcase</span>
                  <a
                    href="https://m1nseokshin.github.io/rally_presentation/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 hover:text-emerald-600 transition-colors"
                  >
                    <span>{lang === "ko" ? "프레젠테이션 바로가기" : "View Presentation"}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Certifications & Education Section (수료 및 자격) */}
      <ScrollReveal className="py-section px-4" threshold={0.25}>
        <section id="certificates" className="certificates-section rounded-[32px] py-16 sm:py-24 px-8 sm:px-16" style={{ backgroundColor: "var(--palette-grey-10)" }}>
          <div className="container max-w-[900px]">
            <div className="section-header text-center mb-[48px]">
              <p className="section-label">Certifications & Training</p>
              <h2 className="section-title mb-3">
                {lang === "ko" ? "수료 및 자격" : "Certifications & Education"}
              </h2>
              <a
                href="https://www.linkedin.com/in/m1nseokdesign/details/certifications/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-600 transition-colors mt-2"
              >
                <span>{lang === "ko" ? "LinkedIn에서 수료증 전체보기" : "View all certifications on LinkedIn"}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>

            <div className="certificates-list flex flex-col gap-6">
              {/* Certificate 1: Google Cloud Generative AI Leader */}
              <div 
                className="certificate-card p-6 sm:p-8 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-3 flex-wrap">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Google Cloud · Coursera
                    </span>
                    <span className="text-xs font-medium text-slate-400">2026.08</span>
                  </div>

                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Generative AI Leader
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {lang === "ko"
                      ? "Google Cloud 주관 생성형 AI 기초 원리, 비즈니스 전략 기획, Responsible AI, Gen AI Apps 및 엔터프라이즈 멀티에이전트 구축 전문가 과정 수료 및 인증 취득."
                      : "Professional certificate by Google Cloud covering Generative AI foundational concepts, strategic implementations, Responsible AI, and enterprise Gen AI applications."}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Credential ID: UP7M8STN1W7T</span>
                  <a
                    href="https://www.coursera.org/account/accomplishments/specialization/UP7M8STN1W7T"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 hover:text-emerald-600 transition-colors"
                  >
                    <span>{lang === "ko" ? "인증서 검증 (Verify)" : "Verify Credential"}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Certificate 2: Google AI for App Building */}
              <div 
                className="certificate-card p-6 sm:p-8 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-3 flex-wrap">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Google · Coursera
                    </span>
                    <span className="text-xs font-medium text-slate-400">2026.08</span>
                  </div>

                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    AI for App Building
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {lang === "ko"
                      ? "Google의 생성형 AI 모델과 머신러닝 API를 활용한 스마트 인터랙티브 애플리케이션 기획 및 빌딩 실무 과정 수료."
                      : "Completed practical course by Google on designing and building intelligent interactive applications powered by AI & ML APIs."}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Credential ID: N22LK00HNU29</span>
                  <a
                    href="https://www.coursera.org/account/accomplishments/records/N22LK00HNU29"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 hover:text-emerald-600 transition-colors"
                  >
                    <span>{lang === "ko" ? "인증서 검증 (Verify)" : "Verify Credential"}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Certificate 3: Higgsfield AI */}
              <div 
                className="certificate-card p-6 sm:p-8 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-3 flex-wrap">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Higgsfield AI
                    </span>
                    <span className="text-xs font-medium text-slate-400">2026.08</span>
                  </div>

                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {lang === "ko"
                      ? "Higgsfield AI Creative Studio Video Generation 수료"
                      : "Higgsfield AI Creative Studio Video Generation Certificate"}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {lang === "ko"
                      ? "Higgsfield Cinema Studio 기반 생성형 AI 비디오 디렉팅, 프롬프트 엔지니어링 및 고화질 영상 크리에이티브 워크플로우 실무 수료."
                      : "Completed practical training in generative AI video directing, prompt engineering, and cinematic video workflows using Higgsfield Cinema Studio."}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Higgsfield AI</span>
                  <a
                    href="https://www.linkedin.com/in/m1nseokdesign/details/certifications/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 hover:text-emerald-600 transition-colors"
                  >
                    <span>{lang === "ko" ? "LinkedIn에서 확인" : "View on LinkedIn"}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>
                </div>
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
            <h2 className="section-title">
              {lang === "ko" ? "운용 툴 및 개발 기술 스택" : "Tools & Tech Stacks"}
            </h2>
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

"use client";

import React, { useState } from "react";
import Link from "next/link";
import TypingTitle from "@/components/TypingTitle";
import HeroCanvas from "@/components/HeroCanvas";
import ScrollReveal from "@/components/ScrollReveal";
import { MailIcon, InstagramIcon, GithubIcon, LinkedInIcon } from "@/components/Footer";

import { useRouter } from "next/navigation";

import { useLanguage } from "@/context/LanguageContext";

export default function HomePage() {
  const { lang } = useLanguage();
  const [showSubContent, setShowSubContent] = useState(false);
  const router = useRouter();

  const handlePhilosophyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("philosophy");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/#philosophy");
    }
  };

  React.useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#contact") {
      const timer = setTimeout(() => {
        const element = document.getElementById("contact");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 350);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-white overflow-hidden">
      {/* Scroll Progress bar */}
      <div className="scroll-progress-container">
        <div className="scroll-progress-bar" id="scroll-bar" style={{ width: "0%" }}></div>
      </div>

      {/* Hero Section */}
      <section id="about" className="hero-section relative w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Interactive physics grid background */}
        <div 
          className="absolute inset-0 w-full h-full transition-opacity duration-[1500ms]"
          style={{ opacity: showSubContent ? 1 : 0 }}
        >
          <HeroCanvas />
        </div>

        <div className="hero-content-wrapper relative z-10 flex flex-col items-center max-w-[1100px] text-center px-4 pointer-events-none">
          <div 
            className="hero-pre-title text-xs uppercase tracking-[2px] font-semibold text-gray-500 mb-6 transition-all duration-1000"
            style={{
              opacity: showSubContent ? 1 : 0,
              transform: showSubContent ? "translateY(0)" : "translateY(10px)",
            }}
          >
            Minseok Shin Portfolio
          </div>
          
          <TypingTitle 
            key={lang}
            part1={lang === "ko" ? "디자인과 개발의 \n" : "Bridging design & \n"}
            part2={lang === "ko" ? (typeof window !== "undefined" && window.innerWidth < 640 ? "경계를 허물어\n" : "경계를 허물어") : "code to craft\n"}
            part3={lang === "ko" ? " 가치를 만듭니다." : " meaningful value."}
            onComplete={() => setShowSubContent(true)}
          />

          <div 
            className="hero-buttons flex justify-center gap-4 transition-all duration-1000"
            style={{
              opacity: showSubContent ? 1 : 0,
              transform: showSubContent ? "translateY(0)" : "translateY(10px)",
              pointerEvents: showSubContent ? "auto" : "none",
            }}
          >
            <Link 
              href="#philosophy" 
              className="btn btn-primary"
              onClick={handlePhilosophyClick}
            >
              {lang === "ko" ? "자세히 알아보기" : "Learn More"}
            </Link>
          </div>
        </div>
      </section>

      {/* Design Philosophy Section */}
      <section id="philosophy" className="values-section py-section">
        <div className="container">
          <p className="section-label mb-6 max-md:mb-0">Philosophy</p>
          <div className="philosophy-layout">
            <div className="philosophy-left">
              <h2 className="philosophy-main-text">
                {lang === "ko" ? (
                  <>
                    디자인과 개발의 경계를 허물어<br />
                    웹에서 완벽한 가치를 만듭니다.
                  </>
                ) : (
                  <>
                    Breaking boundaries between design & code<br />
                    to craft meaningful value on the web.
                  </>
                )}
              </h2>
            </div>
            
            <div className="philosophy-right">
              <p className="philosophy-desc-text">
                {lang === "ko"
                  ? "디자인의 감성적 가치와 개발의 논리적인 프로세스의 접점에서 최상의 사용자 경험이 탄생한다고 생각합니다. 정적인 웹사이트가 아닌 생동감 있는 인터랙티브 웹을 지향하며, 완성도 높은 개발 역량을 목표로 합니다."
                  : "I believe optimal user experiences are created at the intersection of aesthetic design values and logical development processes. I strive for dynamic interactive web solutions beyond static sites, aiming for craftsmanship in development."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ScrollReveal className="py-section px-4" threshold={0.2}>
        <section id="contact" className="projects-section rounded-none py-16 sm:py-24 px-8 sm:px-16" style={{ backgroundColor: "var(--palette-grey-10)" }}>
          <div className="container">
            <div className="section-header text-center mb-0">
              <p className="section-label">Get in Touch</p>
              <h2 className="section-title mb-6">
                {lang === "ko" ? "협업 문의 및 연락처" : "Contact & Collaboration"}
              </h2>
              <p className="hero-subtitle text-lg max-w-[600px] mx-auto mb-10" style={{ color: "var(--theme-surface-on-surface-variant)" }}>
                {lang === "ko"
                  ? "협업이나 기타 문의사항은 자유롭게 아래로 연락 부탁드립니다."
                  : "Feel free to reach out anytime for collaboration or project inquiries."}
              </p>
              
              <div className="flex justify-center gap-6 flex-wrap">
                <a href="mailto:m1nseokdesign@gmail.com" className="w-14 h-14 rounded-full flex items-center justify-center bg-black text-white hover:bg-neutral-800 transition-all duration-300 transform hover:scale-105" aria-label="Email" title="Email">
                  <MailIcon size={24} />
                </a>
                <a href="https://www.linkedin.com/in/m1nseokdesign/" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full flex items-center justify-center bg-black text-white hover:bg-neutral-800 transition-all duration-300 transform hover:scale-105" aria-label="LinkedIn" title="LinkedIn">
                  <LinkedInIcon size={24} />
                </a>
                <a href="https://www.instagram.com/xx_xstyles" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full flex items-center justify-center bg-black text-white hover:bg-neutral-800 transition-all duration-300 transform hover:scale-105" aria-label="Instagram" title="Instagram">
                  <InstagramIcon size={24} />
                </a>
                <a href="https://github.com/m1nseokshin" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full flex items-center justify-center bg-black text-white hover:bg-neutral-800 transition-all duration-300 transform hover:scale-105" aria-label="GitHub" title="GitHub">
                  <GithubIcon size={24} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeDrawer, setActiveDrawer] = useState<"about" | "projects" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // Mobile accordion state triggers
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      router.push("/#contact");
    }
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (drawerOpen) {
        setDrawerOpen(false);
        setActiveDrawer(null);
        if (currentScrollY <= 30) {
          setScrolled(false);
        }
      }

      if (currentScrollY > 30) {
        setScrolled(true);
      } else {
        if (!drawerOpen) {
          setScrolled(false);
        }
      }

      if (!drawerOpen && !mobileOpen) {
        if (currentScrollY > lastScrollY && currentScrollY > 120) {
          setHidden(true);
        } else {
          setHidden(false);
        }
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [drawerOpen, mobileOpen]);

  // Lock/Unlock body scroll when mobile menu opens/closes
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // Cleanup on unmount or state change
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleMouseEnter = (drawer: "about" | "projects") => {
    setActiveDrawer(drawer);
    setDrawerOpen(true);
    setScrolled(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setActiveDrawer(null);
    if (window.scrollY <= 30) {
      setScrolled(false);
    }
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileAboutOpen(false);
    setMobileProjectsOpen(false);
  };

  return (
    <header 
      className={`header-nav ${scrolled ? "scrolled" : ""} ${hidden ? "header-hidden" : ""}`}
      onMouseLeave={closeDrawer}
      suppressHydrationWarning
    >
      <div className="container nav-container" suppressHydrationWarning>
        <Link 
          href="/" 
          className="nav-logo" 
          onClick={() => {
            closeDrawer();
            closeMobileMenu();
          }} 
          suppressHydrationWarning
        >
          Minseok Shin
        </Link>
        
        <nav className="nav-links" suppressHydrationWarning>
          <div 
            className={`nav-link-tab cursor-pointer py-2.5 px-5 rounded-full text-sm font-medium flex items-center gap-1.5 transition-all ${activeDrawer === "about" ? "bg-slate-100/80 text-emerald-500 font-semibold" : "text-slate-600 hover:bg-slate-50"}`}
            onMouseEnter={() => handleMouseEnter("about")}
            suppressHydrationWarning
          >
            <span suppressHydrationWarning>소개</span>
            <svg 
              className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDrawer === "about" ? "rotate-180 text-emerald-500" : "text-slate-400"}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="2.5"
              suppressHydrationWarning
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
          <div 
            className={`nav-link-tab cursor-pointer py-2.5 px-5 rounded-full text-sm font-medium flex items-center gap-1.5 transition-all ${activeDrawer === "projects" ? "bg-slate-100/80 text-emerald-500 font-semibold" : "text-slate-600 hover:bg-slate-50"}`}
            onMouseEnter={() => handleMouseEnter("projects")}
            suppressHydrationWarning
          >
            <span suppressHydrationWarning>작업</span>
            <svg 
              className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDrawer === "projects" ? "rotate-180 text-emerald-500" : "text-slate-400"}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="2.5"
              suppressHydrationWarning
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </nav>
        
        <Link 
          href="/#contact" 
          className="nav-cta-btn" 
          onClick={(e) => {
            closeDrawer();
            handleContactClick(e);
          }} 
          suppressHydrationWarning
        >
          Contact Me
        </Link>
        
        <button 
          className={`mobile-menu-btn flex flex-col justify-center items-center gap-1.5 w-8 h-8 relative z-[1001]`} 
          aria-label="메뉴 열기"
          onClick={() => setMobileOpen(!mobileOpen)}
          suppressHydrationWarning
        >
          <span className={`w-6 h-[2px] bg-slate-900 transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[8px]" : ""}`} suppressHydrationWarning></span>
          <span className={`w-6 h-[2px] bg-slate-900 transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} suppressHydrationWarning></span>
          <span className={`w-6 h-[2px] bg-slate-900 transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[8px]" : ""}`} suppressHydrationWarning></span>
        </button>
      </div>

      {/* Desktop Dropdown Drawers Panel */}
      <div className={`nav-dropdown-drawer ${drawerOpen ? "open" : ""}`} suppressHydrationWarning>
        <div className="container drawer-grid" suppressHydrationWarning>
          {activeDrawer === "about" && (
            <div className="drawer-panel active w-full grid grid-cols-12 gap-10 items-start" suppressHydrationWarning>
              <div className="col-span-4 flex flex-col gap-6" suppressHydrationWarning>
                <div suppressHydrationWarning>
                  <h4 className="text-3xl font-semibold text-slate-900 mb-4" suppressHydrationWarning>소개</h4>
                  <p className="text-sm text-slate-500 leading-relaxed font-normal" suppressHydrationWarning>
                    디자인과 프론트엔드 개발 능력을 조화롭게 갖추어 사용성과 미학을 균형 있게 충족시키는 인재가 되는 것이 목표입니다.
                  </p>
                </div>
                <Link 
                  href="/about" 
                  className="inline-flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-slate-900 text-xs font-semibold py-3 px-6 rounded-full transition-all self-start"
                  onClick={closeDrawer} 
                  suppressHydrationWarning
                >
                  자세히 보기
                </Link>
              </div>
              
              <div className="col-span-1 h-full flex justify-center border-r border-slate-100" suppressHydrationWarning></div>

              <div className="col-span-7 flex flex-col gap-5" suppressHydrationWarning>
                <Link href="/about" className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 hover:text-emerald-500 transition-colors self-start" onClick={closeDrawer} suppressHydrationWarning>소개</Link>
                
                <div className="flex flex-col gap-4 border-t border-slate-100/60 pt-4" suppressHydrationWarning>
                  <Link href="/about#profile" className="group block" onClick={closeDrawer} suppressHydrationWarning>
                    <h5 className="text-sm font-semibold text-slate-800 group-hover:text-emerald-500 transition-colors" suppressHydrationWarning>인사말 & 포부</h5>
                  </Link>
                  <Link href="/about#experience" className="group block" onClick={closeDrawer} suppressHydrationWarning>
                    <h5 className="text-sm font-semibold text-slate-800 group-hover:text-emerald-500 transition-colors" suppressHydrationWarning>활동 및 경험</h5>
                  </Link>
                  <Link href="/about#skills" className="group block" onClick={closeDrawer} suppressHydrationWarning>
                    <h5 className="text-sm font-semibold text-slate-800 group-hover:text-emerald-500 transition-colors" suppressHydrationWarning>기술 스택</h5>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {activeDrawer === "projects" && (
            <div className="drawer-panel active w-full grid grid-cols-12 gap-10 items-start" suppressHydrationWarning>
              <div className="col-span-4 flex flex-col gap-6" suppressHydrationWarning>
                <div suppressHydrationWarning>
                  <h4 className="text-3xl font-semibold text-slate-900 mb-4" suppressHydrationWarning>주요 프로젝트</h4>
                  <p className="text-sm text-slate-500 leading-relaxed font-normal" suppressHydrationWarning>
                    최신 프론트엔드 프레임워크로 제작된 포트폴리오를 탐색해보세요.
                  </p>
                </div>
                <Link 
                  href="/work" 
                  className="inline-flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-slate-900 text-xs font-semibold py-3 px-6 rounded-full transition-all self-start"
                  onClick={closeDrawer} 
                  suppressHydrationWarning
                >
                  전체 보기
                </Link>
              </div>

              <div className="col-span-1 h-full flex justify-center border-r border-slate-100" suppressHydrationWarning></div>

              <div className="col-span-7 flex flex-col gap-5" suppressHydrationWarning>
                <Link href="/work" className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 hover:text-emerald-500 transition-colors self-start" onClick={closeDrawer} suppressHydrationWarning>작업</Link>

                <div className="flex flex-col gap-4 border-t border-slate-100/60 pt-4" suppressHydrationWarning>
                  <Link href="/work#project-artworks" className="group block" onClick={closeDrawer} suppressHydrationWarning>
                    <h5 className="text-sm font-semibold text-slate-800 group-hover:text-emerald-500 transition-colors" suppressHydrationWarning>Design Artworks</h5>
                  </Link>
                  <Link href="/work#work-showcase" className="group block" onClick={closeDrawer} suppressHydrationWarning>
                    <h5 className="text-sm font-semibold text-slate-800 group-hover:text-emerald-500 transition-colors" suppressHydrationWarning>Web Artworks</h5>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Drawer - Accordion list similar to PC design layout */}
      <div className={`mobile-drawer ${mobileOpen ? "open" : ""}`} suppressHydrationWarning>
        
        {/* Accordion 1: 소개 */}
        <div className="border-b border-gray-100 pb-3" suppressHydrationWarning>
          <button 
            onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
            className="w-full flex items-center justify-between text-left py-3 text-lg font-semibold text-slate-800"
            suppressHydrationWarning
          >
            <span>소개</span>
            <svg 
              className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${mobileAboutOpen ? "rotate-180" : ""}`} 
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
          
          <div className={`flex flex-col gap-4 pl-3 pt-2 pb-1 overflow-hidden transition-all duration-300 ${mobileAboutOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`} suppressHydrationWarning>
            <Link href="/about" className="text-sm font-semibold text-emerald-500" onClick={closeMobileMenu}>
              전체보기
            </Link>
            <Link href="/about#profile" className="text-sm text-slate-600" onClick={closeMobileMenu}>
              인사말 & 포부
            </Link>
            <Link href="/about#experience" className="text-sm text-slate-600" onClick={closeMobileMenu}>
              활동 및 경험
            </Link>
            <Link href="/about#skills" className="text-sm text-slate-600" onClick={closeMobileMenu}>
              기술 스택
            </Link>
          </div>
        </div>

        {/* Accordion 2: 작업 */}
        <div className="border-b border-gray-100 pb-3" suppressHydrationWarning>
          <button 
            onClick={() => setMobileProjectsOpen(!mobileProjectsOpen)}
            className="w-full flex items-center justify-between text-left py-3 text-lg font-semibold text-slate-800"
            suppressHydrationWarning
          >
            <span>작업</span>
            <svg 
              className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${mobileProjectsOpen ? "rotate-180" : ""}`} 
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
          
          <div className={`flex flex-col gap-4 pl-3 pt-2 pb-1 overflow-hidden transition-all duration-300 ${mobileProjectsOpen ? "max-h-[150px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`} suppressHydrationWarning>
            <Link href="/work" className="text-sm font-semibold text-emerald-500" onClick={closeMobileMenu}>
              전체보기
            </Link>
            <Link href="/work#project-artworks" className="text-sm text-slate-600" onClick={closeMobileMenu}>
              Design Artworks
            </Link>
            <Link href="/work#work-showcase" className="text-sm text-slate-600" onClick={closeMobileMenu}>
              Web Artworks
            </Link>
          </div>
        </div>

        {/* Contact Me CTA */}
        <Link 
          href="/#contact" 
          className="nav-cta-btn text-center py-3.5 mt-4" 
          onClick={(e) => {
            closeMobileMenu();
            handleContactClick(e);
          }} 
          suppressHydrationWarning
        >
          Contact Me
        </Link>
      </div>
    </header>
  );
}

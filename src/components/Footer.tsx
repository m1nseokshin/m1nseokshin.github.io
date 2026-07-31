"use client";

import React from "react";
import Link from "next/link";

export const MailIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { lang } = useLanguage();

  return (
    <footer className="footer-container" id="contact">
      <div className="container">
        
        {/* Desktop Footer Style (Back to 'enjoy technology' era) */}
        <div className="hidden md:block">
          <div className="footer-grid-wrapper">
            <div className="footer-brand-column">
              <h3 className="footer-headline">Enjoy Technology!</h3>
            </div>
            <div className="footer-links-columns">
              <div>
                <h4 className="footer-col-title">Site Map</h4>
                <div className="footer-links-column">
                  <Link href="/" className="footer-link">{lang === "ko" ? "홈 (Home)" : "Home"}</Link>
                  <Link href="/about" className="footer-link">{lang === "ko" ? "소개 (About)" : "About"}</Link>
                  <Link href="/work" className="footer-link">{lang === "ko" ? "작업 (Work)" : "Work"}</Link>
                </div>
              </div>
              <div>
                <h4 className="footer-col-title">Contact</h4>
                <div className="flex flex-row items-center gap-4 mt-2">
                  <a href="mailto:m1nseokdesign@gmail.com" className="footer-link" aria-label="Email">
                    <MailIcon size={20} />
                  </a>
                  <a href="https://www.instagram.com/xx_xstyles" target="_blank" rel="noopener noreferrer" className="footer-link" aria-label="Instagram">
                    <InstagramIcon size={20} />
                  </a>
                  <a href="https://github.com/m1nseokshin" target="_blank" rel="noopener noreferrer" className="footer-link" aria-label="GitHub">
                    <GithubIcon size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="footer-giant-brand">
            MINSEOK SHIN
          </div>
          
          <div className="footer-bottom-bar">
            <div className="footer-logo-small">Minseok Shin</div>
            <div className="footer-bottom-links">
              <span className="footer-copyright-text">
                © 2026 Minseok Shin. All Rights Reserved.
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Footer Style (Keep current style) */}
        <div className="block md:hidden">
          <div className="flex flex-col gap-6 mb-12">
            
            {/* Site Map Row - always horizontal */}
            <div className="flex flex-row items-center gap-8 border-b border-gray-100/60 pb-4">
              <h4 className="footer-col-title min-w-[90px] mb-0! pb-0! shrink-0">Site Map</h4>
              <div className="flex flex-row items-center gap-6">
                <Link href="/" className="footer-link">{lang === "ko" ? "홈" : "Home"}</Link>
                <Link href="/about" className="footer-link">{lang === "ko" ? "소개" : "About"}</Link>
                <Link href="/work" className="footer-link">{lang === "ko" ? "작업" : "Work"}</Link>
              </div>
            </div>

            {/* Contact Row - always horizontal with word wrapping for email */}
            <div className="flex flex-row items-center gap-8 pb-4">
              <h4 className="footer-col-title min-w-[90px] mb-0! pb-0! shrink-0">Contact</h4>
              <div className="flex flex-row items-center gap-4">
                <a href="mailto:m1nseokdesign@gmail.com" className="footer-link" aria-label="Email">
                  <MailIcon size={20} />
                </a>
                <a href="https://www.instagram.com/xx_xstyles" target="_blank" rel="noopener noreferrer" className="footer-link" aria-label="Instagram">
                  <InstagramIcon size={20} />
                </a>
                <a href="https://github.com/m1nseokshin" target="_blank" rel="noopener noreferrer" className="footer-link" aria-label="GitHub">
                  <GithubIcon size={20} />
                </a>
              </div>
            </div>

          </div>
          
          <div className="footer-giant-brand">
            Minseok Shin
          </div>
          
          <div className="footer-bottom-bar">
            <div className="footer-logo-small hidden">Minseok Shin</div>
            <div className="footer-bottom-links">
              <span className="footer-copyright-text">
                © 2026 Minseok Shin. All Rights Reserved.
              </span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

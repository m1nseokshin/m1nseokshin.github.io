"use client";

import React, { useEffect, useState } from "react";

interface TypingTitleProps {
  part1?: string;
  part2?: string;
  part3?: string;
  className?: string;
  speed?: number;
  onComplete?: () => void;
}

export default function TypingTitle({
  part1 = "디자인과 개발의 \n",
  part2 = "경계를 허물어",
  part3 = " 가치를 만듭니다.",
  className = "hero-title",
  speed = 75,
  onComplete,
}: TypingTitleProps) {
  const [htmlContent, setHtmlContent] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let p1Idx = 0;
    let p2Idx = 0;
    let p3Idx = 0;
    let timer: NodeJS.Timeout;

    // Clean any literal "\\n" string patterns from parts
    const cleanPart1 = part1.replace(/\\n/g, "\n");
    const cleanPart2 = part2;
    const cleanPart3 = part3;

    const typeTitle = () => {
      if (p1Idx < cleanPart1.length) {
        p1Idx++;
        const text = cleanPart1.substring(0, p1Idx).replace(/\n/g, "<br>");
        setHtmlContent(text);
        timer = setTimeout(typeTitle, speed);
      } else if (p2Idx < cleanPart2.length) {
        p2Idx++;
        const text1 = cleanPart1.replace(/\n/g, "<br>");
        const text2 = `<span class="hero-title-accent">${cleanPart2.substring(0, p2Idx)}</span>`;
        setHtmlContent(text1 + text2);
        timer = setTimeout(typeTitle, speed);
      } else if (p3Idx < cleanPart3.length) {
        p3Idx++;
        const text1 = cleanPart1.replace(/\n/g, "<br>");
        const text2 = `<span class="hero-title-accent">${cleanPart2}</span>`;
        const text3 = cleanPart3.substring(0, p3Idx);
        setHtmlContent(text1 + text2 + text3);
        timer = setTimeout(typeTitle, speed);
      } else {
        // Complete typing
        if (onComplete) onComplete();
        
        // Blink cursor for 3 more seconds then hide
        setTimeout(() => {
          setShowCursor(false);
        }, 3000);
      }
    };

    // Delay start
    const startTimeout = setTimeout(typeTitle, 400);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <h1 
      className={`${className} ${showCursor ? "typing-cursor" : ""}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

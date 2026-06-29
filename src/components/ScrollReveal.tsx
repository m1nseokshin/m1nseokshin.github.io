"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
}

export default function ScrollReveal({ children, className = "", threshold = 0.35 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: threshold });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  const variants = {
    hidden: {
      scale: 0.8,
      y: 40,
      opacity: 0,
      clipPath: "inset(4% 4% round 24px)",
    },
    visible: {
      scale: 1,
      y: 0,
      opacity: 1,
      clipPath: "inset(0% 0% round 24px)",
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
      style={{ willChange: "transform, opacity, clip-path" }}
    >
      {children}
    </motion.div>
  );
}

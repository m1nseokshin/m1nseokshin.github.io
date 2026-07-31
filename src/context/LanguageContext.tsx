"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "ko" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "ko",
  setLang: () => {},
  toggleLang: () => {},
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<Language>("ko");

  useEffect(() => {
    const saved = localStorage.getItem("app_lang") as Language;
    if (saved === "ko" || saved === "en") {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("app_lang", newLang);
  };

  const toggleLang = () => {
    const nextLang = lang === "ko" ? "en" : "ko";
    setLang(nextLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

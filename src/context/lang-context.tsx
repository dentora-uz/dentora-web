// src/context/lang-context.tsx — faqat Provider component
import { useState, ReactNode } from "react";
import { translations, Lang } from "@/locales";
import { LangContext } from "./lang-context-value";

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(
    () => (localStorage.getItem("app-lang") as Lang) || "uz"
  );

  function changeLang(l: Lang) {
    setLang(l);
    localStorage.setItem("app-lang", l);
    document.documentElement.setAttribute("lang", l);
  }

  return (
    <LangContext.Provider value={{ lang, setLang: changeLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}
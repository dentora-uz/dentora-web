import { createContext, useContext, useState, ReactNode } from "react";
import { translations, Lang } from "@/locales";

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: typeof translations[Lang];
}

const LangContext = createContext<LangContextType | undefined>(undefined);

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

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
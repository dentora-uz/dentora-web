import { createContext } from "react";
import { translations, Lang } from "@/locales";

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (typeof translations)[Lang];
}

export const LangContext = createContext<LangContextType | undefined>(undefined);
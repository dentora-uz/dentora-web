// src/hooks/use-lang.ts — faqat hook
import { useContext } from "react";
import { LangContext } from "@/context/lang-context-value";

export function useLang() {
    const ctx = useContext(LangContext);
    if (!ctx) throw new Error("useLang must be used within LangProvider");
    return ctx;
} 
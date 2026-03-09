import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sun, Moon, Globe, Check } from "lucide-react";
import { useLang } from "@/hooks/use-lang";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

type Theme = "light" | "dark";
type Lang = "uz" | "en" | "ru";

function SettingSection({
  title,
  icon,
  index,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  index: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className={cn(
        "rounded-2xl border border-blue-100 dark:border-neutral-800",
        "bg-blue-50 dark:bg-neutral-900",
        "overflow-hidden",
      )}
    >
      <div className="flex items-center gap-2 px-5 py-3 border-b border-blue-100 dark:border-neutral-800 bg-white dark:bg-neutral-950">
        <span className="text-blue-400 dark:text-blue-500">{icon}</span>
        <span className="text-xs font-semibold uppercase tracking-widest text-blue-500 dark:text-blue-400">
          {title}
        </span>
      </div>
      <div className="p-4">{children}</div>
    </motion.div>
  );
}

function LangCard({
  label,
  flag,
  active,
  onClick,
}: {
  lang: Lang;
  label: string;
  flag: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center gap-2 px-6 py-4 rounded-xl border-2 transition-all duration-300 w-full",
        active
          ? "border-blue-500 bg-blue-500/10 dark:bg-blue-500/20"
          : "border-blue-100 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-blue-300 dark:hover:border-blue-600",
      )}
    >
      <span className="text-2xl">{flag}</span>
      <span
        className={cn(
          "text-sm font-semibold",
          active
            ? "text-blue-600 dark:text-blue-400"
            : "text-blue-900 dark:text-neutral-200",
        )}
      >
        {label}
      </span>
      {active && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 right-2 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center"
        >
          <Check size={11} className="text-white" strokeWidth={3} />
        </motion.div>
      )}
    </button>
  );
}

function ThemeCard({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center gap-2 px-4 py-4 rounded-xl border-2 transition-all duration-300 w-full",
        active
          ? "border-blue-500 bg-blue-500/10 dark:bg-blue-500/20"
          : "border-blue-100 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-blue-300 dark:hover:border-blue-600",
      )}
    >
      <span
        className={cn(
          "transition-colors duration-300",
          active
            ? "text-blue-500 dark:text-blue-400"
            : "text-blue-300 dark:text-neutral-500",
        )}
      >
        {icon}
      </span>
      <span
        className={cn(
          "text-sm font-semibold",
          active
            ? "text-blue-600 dark:text-blue-400"
            : "text-blue-900 dark:text-neutral-200",
        )}
      >
        {label}
      </span>
      {active && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 right-2 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center"
        >
          <Check size={11} className="text-white" strokeWidth={3} />
        </motion.div>
      )}
    </button>
  );
}

export function Settings() {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem("app-theme") as Theme) || "system",
  );
  const { lang, setLang, t } = useLang(); // ✅
  const s = t.settings; // qisqartirma

  const themes: { theme: Theme; label: string; icon: React.ReactNode }[] = [
    { theme: "light", label: s.theme_light, icon: <Sun size={22} /> },
    { theme: "dark", label: s.theme_dark, icon: <Moon size={22} /> },
  ];

  function changeLanguage(l: Lang) {
    setLang(l);
  }
  function changeTheme(newTheme: Theme) {
    setTheme(newTheme);
    localStorage.setItem("app-theme", newTheme);
    const root = document.documentElement;
    if (newTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark"); 
    }
  }

  const languages: { lang: Lang; label: string; flag: string }[] = [
    { lang: "uz", label: "O'zbekcha", flag: "🇺🇿" },
    { lang: "en", label: "English", flag: "🇬🇧" },
    { lang: "ru", label: "Русский", flag: "🇷🇺" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 flex items-start justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "w-full max-w-lg rounded-2xl overflow-hidden",
          "border border-blue-100 dark:border-neutral-800",
          "shadow-xl shadow-blue-100/40 dark:shadow-none",
          "bg-white dark:bg-neutral-900",
        )}
      >
        {/* Header */}
        <div className="flex flex-col items-center mt-8 px-6 mb-6">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center",
              "bg-gradient-to-br from-blue-400 to-blue-600",
              "text-white",
              "border-4 border-white dark:border-neutral-900",
              "shadow-lg shadow-blue-200 dark:shadow-blue-900/50",
            )}
          >
            <Globe size={28} />
          </motion.div>
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-4 text-center"
          >
            <h1 className="text-2xl font-bold text-blue-900 dark:text-white tracking-tight">
              {s.title}
            </h1>
            <p className="text-xs text-blue-400 dark:text-neutral-500 mt-1">
              {s.subtitle}
            </p>
          </motion.div>
        </div>

        {/* Sections */}
        <div className="px-6 pb-8 flex flex-col gap-4">
          <SettingSection
            title={s.language_section}
            icon={<Globe size={15} />}
            index={1}
          >
            <div className="grid grid-cols-3 gap-3">
              {languages.map(({ lang: l, label, flag }) => (
                <LangCard
                  key={l}
                  lang={l}
                  label={label}
                  flag={flag}
                  active={lang === l}
                  onClick={() => changeLanguage(l)}
                />
              ))}
            </div>
          </SettingSection>

          <SettingSection
            title={s.theme_section}
            icon={<Sun size={15} />}
            index={2}
          >
            <div className="grid grid-cols-3 gap-3">
              {themes.map(({ theme: t, label, icon }) => (
                <ThemeCard
                  key={t}
                  label={label}
                  icon={icon}
                  active={theme === t}
                  onClick={() => changeTheme(t)}
                />
              ))}
            </div>
          </SettingSection>
        </div>
      </motion.div>
    </div>
  );
}

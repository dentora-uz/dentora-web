import { useTheme } from "@/context/theme-context";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
        fixed top-4 right-4 z-50
        w-12 h-12 rounded-full
        flex items-center justify-center
        bg-white dark:bg-zinc-900
        border border-zinc-200 dark:border-zinc-700
        shadow-lg
        transition-all duration-300
        hover:scale-110
        text-xl
      "
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}

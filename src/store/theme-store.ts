import { create } from "zustand";
import { themesData } from "@/data/themes";

const STORAGE_KEY = "fahim-theme";
const DEFAULT_THEME = "cyberpunk";

function getValidThemeId(id: string | null): string {
  if (id && themesData.some((theme) => theme.id === id)) {
    return id;
  }
  return DEFAULT_THEME;
}

function applyThemeClass(themeId: string) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  themesData.forEach((theme) => root.classList.remove(`theme-${theme.id}`));
  root.classList.add(`theme-${themeId}`);
}

interface ThemeState {
  currentTheme: string;
  setTheme: (themeId: string) => void;
  initTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  currentTheme: DEFAULT_THEME,

  setTheme: (themeId) => {
    const validId = getValidThemeId(themeId);
    applyThemeClass(validId);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, validId);
    }
    set({ currentTheme: validId });
  },

  initTheme: () => {
    let stored: string | null = null;
    if (typeof window !== "undefined") {
      stored = localStorage.getItem(STORAGE_KEY);
    }
    const validId = getValidThemeId(stored);
    applyThemeClass(validId);
    set({ currentTheme: validId });
  },
}));

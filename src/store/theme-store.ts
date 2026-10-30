import { create } from "zustand";
import { themesData } from "@/data/themes";

const STORAGE_KEY = "fahim-theme";
const FONT_SIZE_KEY = "fahim-font-size";
const FONT_WEIGHT_KEY = "fahim-font-weight";
const FONT_FAMILY_KEY = "fahim-font-family";
const LETTER_SPACING_KEY = "fahim-letter-spacing";
const DEFAULT_THEME = "cyberpunk";
const DEFAULT_FONT_SIZE = 14;
const DEFAULT_FONT_WEIGHT = "400";
const DEFAULT_FONT_FAMILY = "var(--font-fira-code), monospace";
const DEFAULT_LETTER_SPACING = 0;

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
  fontSize: number;
  fontWeight: string;
  fontFamily: string;
  letterSpacing: number;
  setTheme: (themeId: string) => void;
  setFontSize: (size: number) => void;
  setFontWeight: (weight: string) => void;
  setFontFamily: (family: string) => void;
  setLetterSpacing: (spacing: number) => void;
  initTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  currentTheme: DEFAULT_THEME,
  fontSize: DEFAULT_FONT_SIZE,
  fontWeight: DEFAULT_FONT_WEIGHT,
  fontFamily: DEFAULT_FONT_FAMILY,
  letterSpacing: DEFAULT_LETTER_SPACING,

  setTheme: (themeId) => {
    const validId = getValidThemeId(themeId);
    applyThemeClass(validId);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, validId);
    }
    set({ currentTheme: validId });
  },

  setFontSize: (size) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(FONT_SIZE_KEY, String(size));
    }
    set({ fontSize: size });
  },

  setFontWeight: (weight) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(FONT_WEIGHT_KEY, weight);
    }
    set({ fontWeight: weight });
  },

  setFontFamily: (family) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(FONT_FAMILY_KEY, family);
    }
    set({ fontFamily: family });
  },

  setLetterSpacing: (spacing) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(LETTER_SPACING_KEY, String(spacing));
    }
    set({ letterSpacing: spacing });
  },

  initTheme: () => {
    let stored: string | null = null;
    let storedFontSize: string | null = null;
    let storedFontWeight: string | null = null;
    let storedFontFamily: string | null = null;
    let storedLetterSpacing: string | null = null;
    if (typeof window !== "undefined") {
      stored = localStorage.getItem(STORAGE_KEY);
      storedFontSize = localStorage.getItem(FONT_SIZE_KEY);
      storedFontWeight = localStorage.getItem(FONT_WEIGHT_KEY);
      storedFontFamily = localStorage.getItem(FONT_FAMILY_KEY);
      storedLetterSpacing = localStorage.getItem(LETTER_SPACING_KEY);
    }
    const validId = getValidThemeId(stored);
    applyThemeClass(validId);

    const parsedSize = storedFontSize ? Number(storedFontSize) : NaN;
    const fontSize = Number.isFinite(parsedSize) ? parsedSize : DEFAULT_FONT_SIZE;

    const parsedSpacing = storedLetterSpacing
      ? Number(storedLetterSpacing)
      : NaN;
    const letterSpacing = Number.isFinite(parsedSpacing)
      ? parsedSpacing
      : DEFAULT_LETTER_SPACING;

    set({
      currentTheme: validId,
      fontSize,
      fontWeight: storedFontWeight ?? DEFAULT_FONT_WEIGHT,
      fontFamily: storedFontFamily ?? DEFAULT_FONT_FAMILY,
      letterSpacing,
    });
  },
}));

interface TerminalTheme {
  background: string;
  foreground: string;
  cursor: string;
  selectionBackground: string;
}

const terminalThemes: Record<string, TerminalTheme> = {
  cyberpunk: {
    background: "#030303",
    foreground: "#d4d4d4",
    cursor: "#eb4100",
    selectionBackground: "#3a1a05",
  },
  "tokyo-night": {
    background: "#1a1b26",
    foreground: "#c0caf5",
    cursor: "#7dcfff",
    selectionBackground: "#292e42",
  },
  dracula: {
    background: "#282a36",
    foreground: "#f8f8f2",
    cursor: "#ff79c6",
    selectionBackground: "#44475a",
  },
  matrix: {
    background: "#0d0208",
    foreground: "#00ff41",
    cursor: "#00ff41",
    selectionBackground: "#003b00",
  },
  synthwave: {
    background: "#241b2f",
    foreground: "#f8f8f2",
    cursor: "#ff7edb",
    selectionBackground: "#3d2f52",
  },
};

export function getTerminalTheme(themeId: string): TerminalTheme {
  return terminalThemes[themeId] ?? terminalThemes[DEFAULT_THEME];
}

export function getMonacoTheme(themeId: string): string {
  return `theme-${themeId}`;
}

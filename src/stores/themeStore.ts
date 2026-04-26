import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeMode = "light" | "dark" | "system";

interface ThemeState {
  mode: ThemeMode;
  resolvedMode: "light" | "dark";
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  resolvedTheme: () => "light" | "dark";
}

/**
 * Theme store using Zustand with persistence
 * Supports light, dark, and system modes
 */
export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: "system",
      resolvedMode: "light",

      setMode: (mode: ThemeMode) => {
        set({ mode });
        applyTheme(mode);
      },

      toggleMode: () => {
        const currentMode = get().mode;
        const newMode: ThemeMode =
          currentMode === "light"
            ? "dark"
            : currentMode === "dark"
            ? "system"
            : "light";
        set({ mode: newMode });
        applyTheme(newMode);
      },

      resolvedTheme: () => {
        const mode = get().mode;
        if (mode === "system") {
          return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
        }
        return mode;
      },
    }),
    {
      name: "talli-theme-storage",
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyTheme(state.mode);
        }
      },
    }
  )
);

/**
 * Applies theme class to document root
 */
function applyTheme(mode: ThemeMode) {
  const root = window.document.documentElement;
  root.classList.remove("light", "dark");

  if (mode === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    root.classList.add(systemTheme);
  } else {
    root.classList.add(mode);
  }
}

/**
 * Initialize theme on app load
 */
export function initializeTheme() {
  const state = useThemeStore.getState();
  applyTheme(state.mode);

  // Listen for system theme changes
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", (e) => {
    const currentMode = useThemeStore.getState().mode;
    if (currentMode === "system") {
      applyTheme("system");
    }
  });
}

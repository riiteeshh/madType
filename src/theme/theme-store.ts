import { create } from "zustand";

import { applyTheme } from "./apply-theme";
import { readStoredTheme } from "./read-stored-theme";
import { resolveEffectiveTheme } from "./resolve-effective-theme";
import { THEME_STORAGE_KEY } from "./theme-constants";
import type { ThemePreference } from "./theme-types";

type ThemeState = {
  preference: ThemePreference;
  hydrated: boolean;
  hydrate: () => void;
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  preference: null,
  hydrated: false,
  hydrate: () => {
    const stored = readStoredTheme();
    applyTheme(stored);
    set({ preference: stored, hydrated: true });
  },
  toggleTheme: () => {
    const effective = resolveEffectiveTheme(get().preference);
    const next: ThemePreference = effective === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_STORAGE_KEY, next);
    applyTheme(next);
    set({ preference: next });
  },
}));

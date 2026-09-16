import { THEME_STORAGE_KEY } from "./theme-constants";
import type { ThemePreference } from "./theme-types";

export function readStoredTheme(): ThemePreference {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return null;
}

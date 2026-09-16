import type { ThemePreference } from "./theme-types";

export function resolveEffectiveTheme(
  preference: ThemePreference,
): "light" | "dark" {
  if (preference !== null) return preference;
  const prefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;
  return prefersDark ? "dark" : "light";
}

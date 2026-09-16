import type { ThemePreference } from "./theme-types";

export function applyTheme(theme: ThemePreference): void {
  const root = document.documentElement;
  if (theme === null) {
    root.removeAttribute("data-theme");
    return;
  }
  root.setAttribute("data-theme", theme);
}

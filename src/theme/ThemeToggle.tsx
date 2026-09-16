"use client";

import { useEffect } from "react";

import { resolveEffectiveTheme } from "./resolve-effective-theme";
import { useThemeStore } from "./theme-store";
import { MoonIcon, SunIcon } from "./theme-icons";

export function ThemeToggle() {
  const { preference, hydrated, hydrate, toggleTheme } = useThemeStore();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const isDark = hydrated && resolveEffectiveTheme(preference) === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      className="inline-flex size-9 cursor-pointer items-center justify-center rounded-md border border-border bg-secondary text-secondary-foreground transition-all duration-150 hover:scale-110 hover:bg-accent active:scale-90"
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

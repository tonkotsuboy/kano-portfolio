"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import type { PropsWithChildren } from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  setTheme: (theme: Theme) => void;
  theme: Theme;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const storageKey = "kano-theme" as const;

const applyTheme = (nextTheme: Theme) => {
  const root = document.documentElement;
  root.dataset["theme"] = nextTheme;
  root.style.colorScheme = nextTheme;
};

const detectInitialTheme = (): Theme => {
  if (typeof window === "undefined") {return "light";}

  const saved = window.localStorage.getItem(storageKey);
  if (saved === "light" || saved === "dark") {return saved;}

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
};

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const initial = detectInitialTheme();
    setThemeState(initial);
    applyTheme(initial);

    const listener = (event: MediaQueryListEvent) => {
      const next = event.matches ? "dark" : "light";
      setThemeState((current) => {
        if (window.localStorage.getItem(storageKey)) {return current;}
        applyTheme(next);
        return next;
      });
    };

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  const handleSetTheme = (next: Theme) => {
    setThemeState(next);
    applyTheme(next);
    window.localStorage.setItem(storageKey, next);
  };

  const value = useMemo(
    () => ({ theme, setTheme: handleSetTheme }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
};

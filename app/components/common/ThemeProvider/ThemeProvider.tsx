"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import type { FC, PropsWithChildren } from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  setTheme: (theme: Theme) => void;
  theme: Theme;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const storageKey = "kano-theme" as const;

const applyTheme = (nextTheme: Theme) => {
  const root = document.documentElement;
  root.dataset.theme = nextTheme;
  root.style.colorScheme = nextTheme;
};

const detectInitialTheme = (): Theme => {
  if (typeof window === "undefined") {return "light";}

  const saved = window.localStorage.getItem(storageKey);
  if (saved === "light" || saved === "dark") {return saved;}

  const isPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return isPrefersDark ? "dark" : "light";
};

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const initial = detectInitialTheme();
    setThemeState(initial);
    applyTheme(initial);

    const listener = (event: MediaQueryListEvent) => {
      const nextTheme = event.matches ? "dark" : "light";
      setThemeState((current) => {
        const storedTheme = window.localStorage.getItem(storageKey);
        if (storedTheme !== null) {return current;}
        applyTheme(nextTheme);
        return nextTheme;
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

type UseTheme = () => ThemeContextValue;

export const useTheme: UseTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
};

"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import type { FC, PropsWithChildren } from "react";

type ResolvedTheme = "dark" | "light";
type ThemeMode = "dark" | "light" | "system";

type ThemeContextValue = {
  mode: ThemeMode;
  setMode: (_mode: ThemeMode) => void;
  theme: ResolvedTheme;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const storageKey = "kano-theme" as const;

const applyTheme = (nextTheme: ResolvedTheme) => {
  const root = document.documentElement;
  root.dataset["theme"] = nextTheme;
  root.style.colorScheme = nextTheme;
};

const getSystemTheme = (): ResolvedTheme => {
  if (typeof window === "undefined") {return "light";}
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const detectInitialMode = (): ThemeMode => {
  if (typeof window === "undefined") {return "system";}

  const saved = window.localStorage.getItem(storageKey);
  if (saved === "light" || saved === "dark" || saved === "system") {return saved;}

  return "system";
};

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [mode, setModeState] = useState<ThemeMode>("system");
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light");

  useEffect(() => {
    const initialMode = detectInitialMode();
    const resolved = initialMode === "system" ? getSystemTheme() : initialMode;
    setModeState(initialMode);
    setResolvedTheme(resolved);
    applyTheme(resolved);

    const listener = (event: MediaQueryListEvent) => {
      setModeState((currentMode) => {
        if (currentMode !== "system") {return currentMode;}
        const nextTheme = event.matches ? "dark" : "light";
        setResolvedTheme(nextTheme);
        applyTheme(nextTheme);
        return currentMode;
      });
    };

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  const handleSetMode = (next: ThemeMode) => {
    setModeState(next);
    const resolved = next === "system" ? getSystemTheme() : next;
    setResolvedTheme(resolved);
    applyTheme(resolved);
    window.localStorage.setItem(storageKey, next);
  };

  const value = useMemo(
    () => ({ mode, setMode: handleSetMode, theme: resolvedTheme }),
    [mode, resolvedTheme],
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

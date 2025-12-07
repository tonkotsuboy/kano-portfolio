"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "../ThemeProvider";

import styles from "./ThemeToggle.module.css";

import type { FC } from "react";

export const ThemeToggle: FC = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const handleToggle = () => setTheme(isDark ? "light" : "dark");

  return (
    <button
      type="button"
      className={styles.toggle}
      aria-label={isDark ? "ライトモードに切り替え" : "ダークモードに切り替え"}
      onClick={handleToggle}
    >
      <span className={styles.icon}>{isDark ? <Sun size={16} /> : <Moon size={16} />}</span>
      <span className={styles.label}>{isDark ? "Light" : "Dark"}</span>
      <span className={styles.thumb} data-active={isDark} />
    </button>
  );
};

"use client";

import { Check, Monitor, Moon, Sun } from "lucide-react";

import { useTheme } from "../ThemeProvider";

import styles from "./ThemeToggle.module.css";

import type { FC } from "react";

const POPOVER_ID = "theme-toggle-popover";

const options = [
  { icon: Sun, label: "ライトテーマ", value: "light" },
  { icon: Moon, label: "ダークテーマ", value: "dark" },
  { icon: Monitor, label: "システム", value: "system" },
] as const;

export const ThemeToggle: FC = () => {
  const { mode, setMode, theme } = useTheme();
  const ButtonIcon = theme === "dark" ? Moon : Sun;

  return (
    <>
      <button
        type="button"
        className={styles.toggle}
        data-theme={theme}
        popoverTarget={POPOVER_ID}
        aria-haspopup="menu"
        aria-label="テーマを切り替え"
      >
        <span className={styles.icon}>
          <ButtonIcon size={18} />
        </span>
      </button>

      <ul
        id={POPOVER_ID}
        className={styles.menu}
        popover="auto"
        role="menu"
        aria-label="テーマ選択"
      >
        {options.map((option) => (
          <li key={option.value} role="presentation">
            <button
              type="button"
              role="menuitemradio"
              aria-checked={mode === option.value}
              className={styles.menuItem}
              popoverTarget={POPOVER_ID}
              popoverTargetAction="hide"
              onClick={() => setMode(option.value)}
            >
              <option.icon className={styles.menuIcon} size={16} />
              <span className={styles.menuLabel}>{option.label}</span>
              {mode === option.value && (
                <Check className={styles.checkIcon} size={16} />
              )}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

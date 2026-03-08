"use client";

import { Check, Monitor, Moon, Sun } from "lucide-react";
import { useCallback, useState } from "react";

import { useTheme } from "../ThemeProvider";

import styles from "./ThemeToggle.module.css";

import type { FC } from "react";

const options = [
  { icon: Sun, label: "ライトテーマ", value: "light" },
  { icon: Moon, label: "ダークテーマ", value: "dark" },
  { icon: Monitor, label: "システム", value: "system" },
] as const;

export const ThemeToggle: FC = () => {
  const { mode, setMode, theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleSelect = useCallback(
    (value: "dark" | "light" | "system") => {
      setMode(value);
      setIsOpen(false);
    },
    [setMode],
  );

  const handleBlur = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsOpen(false);
    }
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  }, []);

  const isDark = theme === "dark";
  const ButtonIcon = isDark ? Moon : Sun;

  return (
    <div className={styles.container} onBlur={handleBlur} onKeyDown={handleKeyDown}>
      <button
        type="button"
        className={styles.toggle}
        data-theme={theme}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="テーマを切り替え"
        onClick={handleToggle}
      >
        <span className={styles.icon}>
          <ButtonIcon size={18} />
        </span>
      </button>

      {isOpen && (
        <ul className={styles.menu} role="listbox" aria-label="テーマ選択">
          {options.map((option) => (
            <li key={option.value} role="option" aria-selected={mode === option.value}>
              <button
                type="button"
                className={styles.menuItem}
                data-active={mode === option.value || undefined}
                onClick={() => handleSelect(option.value)}
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
      )}
    </div>
  );
};

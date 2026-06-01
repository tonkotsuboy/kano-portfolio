"use client";

import { Check, Monitor, Moon, Sun } from "lucide-react";

import { useTheme } from "../ThemeProvider/ThemeProvider";

import styles from "./ThemeToggle.module.css";

import type { FC } from "react";

const POPOVER_ID = "theme-toggle-popover";

const options = [
  { icon: Sun, label: "ライトテーマ", value: "light" },
  { icon: Moon, label: "ダークテーマ", value: "dark" },
  { icon: Monitor, label: "システム", value: "system" },
] as const;

// Invoker Commands（command / commandfor）は Safari 26.2 / Firefox 144 以降。未対応ブラウザでは
// command 属性が無視されメニューを開けないため、Popover API の toggle/hidePopover で代替する
// （Popover 自体は広くサポート）。ネイティブ対応時は command が処理するので二重発火させない。
const supportsInvokerCommands = (): boolean =>
  typeof HTMLButtonElement !== "undefined" && "commandForElement" in HTMLButtonElement.prototype;

export const ThemeToggle: FC = () => {
  const { mode, setMode, theme } = useTheme();
  const ButtonIcon = theme === "dark" ? Moon : Sun;

  return (
    <>
      <button
        type="button"
        className={styles.toggle}
        data-theme={theme}
        commandfor={POPOVER_ID}
        command="toggle-popover"
        aria-haspopup="menu"
        aria-label="テーマを切り替え"
        onClick={() => {
          if (!supportsInvokerCommands()) {
            document.getElementById(POPOVER_ID)?.togglePopover?.();
          }
        }}
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
              commandfor={POPOVER_ID}
              command="hide-popover"
              onClick={() => {
                setMode(option.value);
                if (!supportsInvokerCommands()) {
                  document.getElementById(POPOVER_ID)?.hidePopover?.();
                }
              }}
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

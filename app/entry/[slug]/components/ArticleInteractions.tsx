"use client";

import { useCallback } from "react";

import styles from "./ArticleInteractions.module.css";

import type { FC, MouseEvent, ReactNode } from "react";

type Props = {
  children: ReactNode;
}

// 本文に注入された HTML（コードブロック）へクリック委譲でコードコピーを足すクライアント層。
// 画像のクリック拡大は廃止したため、ここでは扱わない。
export const ArticleInteractions: FC<Props> = ({ children }) => {
  const handleClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const copyButton = (event.target as HTMLElement).closest("[data-code-copy]");
    if (!copyButton) {
      return;
    }
    const code = copyButton.closest("[data-code]")?.querySelector("pre")?.textContent ?? "";
    void navigator.clipboard?.writeText(code).then(() => {
      copyButton.setAttribute("data-copied", "true");
      setTimeout(() => copyButton.removeAttribute("data-copied"), 1600);
    }).catch(() => undefined);
  }, []);

  return (
    <div className={styles.interactions} onClick={handleClick}>
      {children}
    </div>
  );
};

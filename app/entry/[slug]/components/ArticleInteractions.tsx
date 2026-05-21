"use client";

import { X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import styles from "./ArticleInteractions.module.css";

import type { FC, MouseEvent, ReactNode } from "react";

type Lightbox = {
  alt: string;
  src: string;
}

type Props = {
  children: ReactNode;
}

// 本文に注入された HTML（コードブロック / 画像）へクリック委譲でインタラクションを足すクライアント層。
// 重いコンテンツはサーバー描画のまま children として受け取り、ここではコピーと拡大のみを担う。
export const ArticleInteractions: FC<Props> = ({ children }) => {
  const [lightbox, setLightbox] = useState<Lightbox | null>(null);

  const handleClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;

    const copyButton = target.closest("[data-code-copy]");
    if (copyButton) {
      const code = copyButton.closest("[data-code]")?.querySelector("pre")?.textContent ?? "";
      void navigator.clipboard?.writeText(code).then(() => {
        copyButton.setAttribute("data-copied", "true");
        window.setTimeout(() => copyButton.removeAttribute("data-copied"), 1600);
      }).catch(() => undefined);
      return;
    }

    const trigger = target.closest("[data-lightbox]");
    if (trigger) {
      const image = trigger.querySelector("img");
      if (image) {
        setLightbox({ alt: image.alt, src: image.currentSrc || image.src });
      }
    }
  }, []);

  useEffect(() => {
    if (!lightbox) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightbox(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightbox]);

  return (
    <div className={styles.interactions} onClick={handleClick}>
      {children}
      {lightbox ? (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label="画像の拡大表示"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className={styles.lightboxClose}
            aria-label="閉じる"
            onClick={() => setLightbox(null)}
          >
            <X size={22} aria-hidden />
          </button>
          <figure className={styles.lightboxFigure} onClick={(event) => event.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element -- 任意サイズの拡大画像のため素の img を使う */}
            <img className={styles.lightboxImage} src={lightbox.src} alt={lightbox.alt} />
            {lightbox.alt ? <figcaption className={styles.lightboxCaption}>{lightbox.alt}</figcaption> : null}
          </figure>
        </div>
      ) : null}
    </div>
  );
};

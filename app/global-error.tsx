"use client";

import { useEffect } from "react";

import "./styles/globals.css";
import styles from "./global-error.module.css";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="ja">
      <body>
        <main id="main-content" role="alert" className={styles.fallback}>
          <h1>問題が発生しました</h1>
          <p>ページの読み込み中にエラーが発生しました。もう一度お試しください。</p>
          <button type="button" onClick={reset}>
            もう一度試す
          </button>
        </main>
      </body>
    </html>
  );
}

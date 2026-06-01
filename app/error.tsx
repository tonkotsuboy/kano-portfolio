"use client";

import { useEffect } from "react";

import styles from "./error.module.css";
import { Header } from "./features/layout/Header/Header";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.shell}>
      <Header currentPath="" />
      <main id="main-content" tabIndex={-1} className={styles.main}>
        <div className={styles.page}>
          <p className={styles.code}>Error</p>
          <h1 className={styles.title}>問題が発生しました</h1>
          <p className={styles.description}>
            ページの読み込み中にエラーが発生しました。もう一度お試しください。
          </p>
          <button type="button" className={styles.button} onClick={reset}>
            もう一度試す
          </button>
        </div>
      </main>
    </div>
  );
}

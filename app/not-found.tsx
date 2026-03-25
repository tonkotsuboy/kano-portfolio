import Link from "next/link";

import { Footer } from "./features/layout/Footer";
import { Header } from "./features/layout/Header";
import styles from "./not-found.module.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - ページが見つかりません",
};

export default function NotFound() {
  return (
    <div className={styles.shell}>
      <Header />
      <main className={styles.main}>
        <div className={styles.page}>
          <p className={styles.code}>404</p>
          <h1 className={styles.title}>ページが見つかりません</h1>
          <p className={styles.description}>
            お探しのページは移動または削除された可能性があります。
          </p>
          <Link href="/" className={styles.link}>
            ホームに戻る
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

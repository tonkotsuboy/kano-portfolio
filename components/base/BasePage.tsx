import React from "react";
import Head from "next/head";
import styles from "./BasePage.module.scss";
import { AppNavigation } from "../navigation/AppNavigation";

type Props = {
  pageTitle?: string | null;
};

/**
 * 各ページ共通で使用するテンプレート
 */
const BasePage: React.FC<Props> = ({ pageTitle, children }) => {
  const title = `${pageTitle ? `${pageTitle} - ` : ""}鹿野ポートフォリオ`;

  return (
    <div className="container">
      <Head>
        <title>{title}</title>
        <meta name="robots" content="noindex" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className={styles.wrapper}>
        <AppNavigation />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
};

export default BasePage;

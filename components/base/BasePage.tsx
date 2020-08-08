import React from "react";
import Head from "next/head";
import styles from "./BasePage.module.scss";
import { AppNavigation } from "../navigation/AppNavigation";

/**
 * 各ページ共通で使用するテンプレート
 */
const BasePage: React.FC = ({ children }) => (
  <div className="container">
    <Head>
      <title>鹿野ポートフォリオ</title>
      <link rel="icon" href="/favicon.ico" />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap"
        rel="stylesheet"
      />
    </Head>
    <div className={styles.wrapper}>
      <AppNavigation className={styles.navigation} />
      <main className={styles.main}>{children}</main>
    </div>
  </div>
);

export default BasePage;

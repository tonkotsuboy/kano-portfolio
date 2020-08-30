import React from "react";
import Head from "next/head";
import { useSelector } from "react-redux";
import styles from "./BasePage.module.scss";
import { OverlayNavigation } from "../navigation/OverlayNavigation";
import { SideNavigation } from "../navigation/SideNavigation";
import AppHeader from "../header/AppHeader";
import { RootState } from "../../store";

type Props = {
  pageTitle?: string | null;
};

/**
 * 各ページ共通で使用するテンプレート
 */
const BasePage: React.FC<Props> = ({ pageTitle, children }) => {
  const title = `${pageTitle ? `${pageTitle} - ` : ""}鹿野ポートフォリオ`;

  const navigationIsOpened = useSelector<RootState>(
    (state) => state.navigationIsOpened
  );

  return (
    <div
      className={[
        styles.appRoot,
        navigationIsOpened ? styles.appRoot__navigationOpened : null,
      ]
        .filter((value) => value != null)
        .join(" ")}
    >
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
        <AppHeader className={styles.appHeader} />
        <main className={styles.main}>{children}</main>
        <OverlayNavigation className={styles.overlayNavigation} />
        <SideNavigation className={styles.sideNavigation} />
      </div>
    </div>
  );
};

export default BasePage;

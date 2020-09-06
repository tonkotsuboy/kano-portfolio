import React from "react";
import Head from "next/head";
import { useSelector } from "react-redux";
import styles from "./BasePage.module.scss";
import { OverlayNavigation } from "../navigation/OverlayNavigation";
import { SideNavigation } from "../navigation/SideNavigation";
import AppHeader from "../header/AppHeader";
import { RootState } from "../../store";
import { ogImageUrl, TwitterId } from "../../constants/Constants";

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
        <link rel="icon" href="/favicon.ico" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={`@${TwitterId}`} />
        <meta name="og:title" content={title} />
        <meta name="og:image" content={ogImageUrl} />
        <meta name="og:description" content={title} />
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

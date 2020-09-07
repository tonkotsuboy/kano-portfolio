import React from "react";
import Head from "next/head";
import { useSelector } from "react-redux";
import styles from "./BasePage.module.scss";
import { OverlayNavigation } from "../navigation/OverlayNavigation";
import { SideNavigation } from "../navigation/SideNavigation";
import AppHeader from "../header/AppHeader";
import { RootState } from "../../store";
import {
  basicDescription,
  ogImageUrl,
  TwitterId,
} from "../../constants/Constants";

type Props = {
  pageTitle?: string | null;
  pageDescription?: string | null;
};

/**
 * 各ページ共通で使用するテンプレート
 */
const BasePage: React.FC<Props> = ({
  pageTitle,
  pageDescription,
  children,
}) => {
  const title = `${pageTitle ? `${pageTitle} - ` : ""}鹿野ポートフォリオ`;

  const description = pageDescription ?? basicDescription;

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
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={`@${TwitterId}`} />
        <meta name="og:title" content={title} />
        <meta name="og:image" content={ogImageUrl} />
        <meta name="og:description" content={description} />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <meta name="theme-color" content="#3f3f9d" />
      </Head>
      <div className={styles.wrapper}>
        <AppHeader className={styles.appHeader} />
        <main className={styles.main}>
          {children}
          <address className={styles.copyright}>© 2020 Takeshi Kano</address>
        </main>
        <OverlayNavigation className={styles.overlayNavigation} />
        <SideNavigation className={styles.sideNavigation} />
      </div>
    </div>
  );
};

export default BasePage;

import { Analytics } from "@vercel/analytics/react";

import { GoogleAnalytics } from "./components/common/GoogleAnalytics";
import { Navigation } from "./components/concerns/Navigation";
import {
  basicDescription,
  ogImageUrl,
  SiteTitle,
  TwitterId,
} from "./constants";
import * as styles from "./layout.css";
import { fetchMedia } from "./logics/api/fetchMedia";
import { fetchTagList } from "./logics/api/fetchTagList";

import type { MediumType } from "./types/MediumType";
import type { TagType } from "./types/TagType";
import type { Metadata, NextPage } from "next";
import type { ReactNode } from "react";

import "./styles/reset.css";
import "./styles/base.css";

export const metadata: Metadata = {
  title: SiteTitle,
  viewport: "width=device-width,initial-scale=1",
  icons: ["/favicon.ico", "/favicon-16x16.png", "/favicon-32x32.png"],
  manifest: "/manifest.json",
  themeColor: "#3f3f9d",
  referrer: "no-referrer",
  description: basicDescription,
  metadataBase: new URL("https://kano.codes"),
  twitter: {
    title: SiteTitle,
    card: "summary_large_image",
    images: [ogImageUrl],
    site: `@${TwitterId}`,
  },
  openGraph: {
    title: SiteTitle,
    images: [ogImageUrl],
    description: basicDescription,
  },
};

const getEntryData = async (): Promise<
  [mediumDataList: MediumType[], tagDataList: TagType[]]
> => {
  return await Promise.all([fetchMedia(), fetchTagList()]);
};

const RootLayout: NextPage<{ children: ReactNode }> = async ({ children }) => {
  const [mediumDataList, tagDataList] = await getEntryData();

  return (
    <html lang="ja">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body>
        <div className={styles.root}>
          <div className={styles.wrapper}>
            <Navigation
              mediumDataList={mediumDataList}
              tagDataList={tagDataList}
            />
            <main className={styles.main}>{children}</main>
          </div>
        </div>
        <GoogleAnalytics />
        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;

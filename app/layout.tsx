import type { ReactNode } from "react";
import Head from "next/head";
import {
  basicDescription,
  ogImageUrl,
  SiteTitle,
  TwitterId,
} from "./constants";
import { Navigation } from "./components/concerns/Navigation";
import type { MediumType } from "./types/MediumType";
import type { TagType } from "./types/TagType";
import { fetchMedia } from "./logics/api/fetchMedia";
import { fetchTagList } from "./logics/api/fetchTagList";
import type { Metadata, NextPage } from "next";
import { main, root, wrapper } from "./layout.css";
import "./styles/reset.css";
import "./styles/base.css";

export const metadata: Metadata = {
  title: SiteTitle,
  viewport: "width=device-width,initial-scale=1",
  icons: ["/favicon.ico", "/favicon-16x16.png", "/favicon-32x32.png"],
  manifest: "/manifest.json",
  themeColor: "#3f3f9d",
  description: basicDescription,
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
      <Head>
        <meta charSet="utf-8" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </Head>
      <body>
        <div className={root}>
          <div className={wrapper}>
            <Navigation
              mediumDataList={mediumDataList}
              tagDataList={tagDataList}
            />
            <main className={main}>{children}</main>
          </div>
        </div>
        {/*<GoogleAnalytics />*/}
      </body>
    </html>
  );
};

export default RootLayout;

import "temporal-polyfill/global";
import "./styles/globals.css";

import clsx from "clsx";
import { Inter, Noto_Sans_JP } from "next/font/google";

import {
  basicDescription,
  ogImageUrl,
  SiteTitle,
  SiteUrl,
  TwitterId,
  WithSiteTitle,
} from "./constants";
import { ServiceWorkerRegister } from "./features/pwa/ServiceWorkerRegister";
import { ThemeProvider } from "./features/theme/ThemeProvider";

import type { Metadata, Viewport } from "next";
import type { JSX } from "react";

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "900"],
});

const notoSansJP = Noto_Sans_JP({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  alternates: {
    canonical: SiteUrl,
    types: {
      "application/rss+xml": `${SiteUrl}/feed.xml`,
    },
  },
  description: basicDescription,
  metadataBase: new URL(SiteUrl),
  openGraph: {
    description: basicDescription,
    images: [
      {
        alt: SiteTitle,
        height: 630,
        url: ogImageUrl,
        width: 1200,
      },
    ],
    siteName: SiteTitle,
    title: SiteTitle,
    type: "website",
    url: SiteUrl,
  },
  // Baseline 2026 視野: Cross-document View Transitions の opt-in。
  // 同一サイト内のページ遷移を滑らかに繋ぐ。対応ブラウザ（Chrome 126+, Safari 18.2+）でのみ有効、
  // 未対応ブラウザは普通の遷移にフォールバックする。Next.js の head hoisting に正しく乗せるため
  // 手書きの <meta> ではなく metadata.other 経由で出力する。
  other: {
    "view-transition": "same-origin",
  },
  title: {
    default: SiteTitle,
    template: `%s${WithSiteTitle}`,
  },
  twitter: {
    card: "summary_large_image",
    creator: `@${TwitterId}`,
    description: basicDescription,
    images: [ogImageUrl],
    site: `@${TwitterId}`,
    title: SiteTitle,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { color: "#f6f7fb", media: "(prefers-color-scheme: light)" },
    { color: "#0b1021", media: "(prefers-color-scheme: dark)" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="ja" className={clsx(inter.variable, notoSansJP.variable)} suppressHydrationWarning>
      <body>
        <a href="#main-content" className="skip-nav">
          メインコンテンツへスキップ
        </a>
        <ThemeProvider>{children}</ThemeProvider>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}

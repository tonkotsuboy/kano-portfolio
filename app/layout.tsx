import "./styles/globals.css";

import clsx from "clsx";
import { Inter, Noto_Sans_JP } from "next/font/google";
import Script from "next/script";

import {
  basicDescription,
  ogImageUrl,
  SiteTitle,
  SiteUrl,
  TwitterId,
  WithSiteTitle,
} from "./constants";
import { WebVitals } from "./features/analytics/WebVitals/WebVitals";
import { ServiceWorkerRegister } from "./features/pwa/ServiceWorkerRegister";
import { ThemeProvider } from "./features/theme/ThemeProvider/ThemeProvider";

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
    locale: "ja_JP",
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

// Google ナレッジグラフに「鹿野壮」という人物エンティティを断定的に伝える構造化データ。
// Person（本体）と WebSite（サイト自体）を @graph で束ね、@id で相互参照させる。
// sameAs は別ドメインに散った同一人物のプロフィールを一本に束ねる線として最重要。
// 検証は Rich Results Test / Schema Markup Validator で行う。
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@id": `${SiteUrl}/#person`,
      "@type": "Person",
      alternateName: ["かの たけし", "tonkotsuboy"],
      description: basicDescription,
      image: `${SiteUrl}/profile.jpg`,
      jobTitle: "Staff Product Engineer",
      knowsAbout: [
        "CSS",
        "TypeScript",
        "JavaScript",
        "Web フロントエンド",
        "Web 標準",
        "アクセシビリティ",
      ],
      name: SiteTitle,
      sameAs: [
        `https://x.com/${TwitterId}`,
        "https://github.com/tonkotsuboy",
        "https://zenn.dev/tonkotsuboy_com",
        "https://qiita.com/tonkotsuboy_com",
        "https://speakerdeck.com/tonkotsuboy_com",
        "https://www.linkedin.com/in/tonkotsuboy/",
        "https://www.instagram.com/tonkotsuboy_com",
        "https://www.facebook.com/takeshikano",
        "https://note.com/tonkotsuboy_com",
        "https://techfeed.io/people/@tonkotsuboy_com",
        "https://youtrust.jp/users/tonkotsuboy_com",
        "https://67.org/ws/instructor/kano.html",
        "https://gihyo.jp/author/%E9%B9%BF%E9%87%8E%E5%A3%AE",
      ],
      url: SiteUrl,
      worksFor: {
        "@type": "Organization",
        name: "Ubie株式会社",
      },
    },
    {
      "@id": `${SiteUrl}/#website`,
      "@type": "WebSite",
      description: basicDescription,
      inLanguage: "ja-JP",
      name: SiteTitle,
      publisher: { "@id": `${SiteUrl}/#person` },
      url: SiteUrl,
    },
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
        {/* 構造化データ（JSON-LD）。Next.js 公式推奨どおり <script> で出力し、
            XSS 対策として "<" を < にエスケープする。 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        {/* 描画前にテーマを確定させ FOUC を防ぐ。beforeInteractive で <head> 内に
            同期実行される。ThemeProvider（useEffect）より先に data-theme を設定。 */}
        <Script src="/theme-init.js" strategy="beforeInteractive" />
        <a href="#main-content" className="skip-nav">
          メインコンテンツへスキップ
        </a>
        <ThemeProvider>{children}</ThemeProvider>
        <ServiceWorkerRegister />
        <WebVitals />
      </body>
    </html>
  );
}

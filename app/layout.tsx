import "./styles/globals.css";

import { ThemeProvider } from "./components/common/ThemeProvider";
import {
  basicDescription,
  ogImageUrl,
  SiteTitle,
  SiteUrl,
  TwitterId,
  WithSiteTitle,
} from "./constants";

import type { Metadata } from "next";
import type { JSX } from "react";

export const metadata: Metadata = {
  alternates: {
    canonical: SiteUrl,
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
    url: SiteUrl,
  },
  themeColor: [
    { color: "#f6f7fb", media: "(prefers-color-scheme: light)" },
    { color: "#0b1021", media: "(prefers-color-scheme: dark)" },
  ],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  params: Promise<Record<string, never>>;
}): JSX.Element {
  return (
    <html lang="ja" suppressHydrationWarning={true}>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

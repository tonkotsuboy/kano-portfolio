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
import { JSX } from "react";

export const metadata: Metadata = {
  metadataBase: new URL(SiteUrl),
  title: {
    default: SiteTitle,
    template: `%s${WithSiteTitle}`,
  },
  description: basicDescription,
  openGraph: {
    title: SiteTitle,
    description: basicDescription,
    url: SiteUrl,
    siteName: SiteTitle,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: SiteTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: `@${TwitterId}`,
    creator: `@${TwitterId}`,
    title: SiteTitle,
    description: basicDescription,
    images: [ogImageUrl],
  },
  alternates: {
    canonical: SiteUrl,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f7fb" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1021" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="ja" suppressHydrationWarning={true}>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

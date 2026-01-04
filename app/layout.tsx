import "./styles/globals.css";

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

export const metadata: Metadata = {
  alternates: {
    canonical: SiteUrl,
  },
  description: basicDescription,
  manifest: "/manifest.webmanifest",
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
  params: Promise<Record<string, never>>;
}): JSX.Element {
  return (
    <html lang="ja" suppressHydrationWarning={true}>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}

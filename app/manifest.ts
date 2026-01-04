import { basicDescription, SiteTitle, SiteUrl } from "./constants";

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: "#0b1021",
    description: basicDescription,
    display: "standalone",
    icons: [
      {
        sizes: "192x192",
        src: "/android-chrome-192x192.png",
        type: "image/png",
      },
      {
        purpose: "maskable",
        sizes: "512x512",
        src: "/android-chrome-512x512.png",
        type: "image/png",
      },
      {
        sizes: "180x180",
        src: "/apple-touch-icon.png",
        type: "image/png",
      },
      {
        sizes: "32x32",
        src: "/favicon-32x32.png",
        type: "image/png",
      },
      {
        sizes: "16x16",
        src: "/favicon-16x16.png",
        type: "image/png",
      },
    ],
    lang: "ja",
    name: SiteTitle,
    scope: "/",
    screenshots: [
      {
        sizes: "1200x630",
        src: `${SiteUrl}/ogimage.png`,
        type: "image/png",
      },
    ],
    short_name: "Kano Portfolio",
    start_url: "/",
    theme_color: "#f6f7fb",
  };
}

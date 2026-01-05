const { build } = require("velite");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 240,
  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
    ];
  },
  webpack: (config, { dev }) => {
    if (dev) {
      build({ watch: true });
    } else {
      build();
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "image.gihyo.co.jp",
      },
      {
        protocol: "https",
        hostname: "doorkeeper.jp",
      },
      {
        protocol: "https",
        hostname: "assets.st-note.com",
      },
      {
        protocol: "https",
        hostname: "cdn.image.st-hatena.com",
      },
      {
        protocol: "https",
        hostname: "www.salesforce.com",
      },
      {
        protocol: "http",
        hostname: "cssnite-kobe.jp",
      },
      {
        protocol: "https",
        hostname: "s3-ap-northeast-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "connpass-tokyo.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "files.speakerdeck.com",
      },
      {
        protocol: "https",
        hostname: "cssnite-osaka.com",
      },
      {
        protocol: "https",
        hostname: "cssnite.jp",
      },
      {
        protocol: "https",
        hostname: "qiita-user-contents.imgix.net",
      },
      {
        protocol: "https",
        hostname: "connpass-tokyo.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
      {
        protocol: "https",
        hostname: "techfeed.io",
      },
      {
        protocol: "https",
        hostname: "findy-code-images.s3.ap-northeast-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "levtech.jp",
      },
      {
        protocol: "https",
        hostname: "media.connpass.com",
      },
    ],
  },
};

module.exports = nextConfig;

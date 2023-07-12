const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withPWA = require("next-pwa")({
  dest: "public",
});
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
  staticPageGenerationTimeout: 240,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
      {
        protocol: "https",
        hostname: "doorkeeper.jp",
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
    ],
  },
};

module.exports = withPWA(withVanillaExtract(nextConfig));

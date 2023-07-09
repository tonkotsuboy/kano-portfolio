const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
        port: "",
      },
      {
        protocol: "https",
        hostname: "doorkeeper.jp",
        port: "",
      },
      {
        protocol: "http",
        hostname: "cssnite-kobe.jp",
        port: "",
      },
      {
        protocol: "https",
        hostname: "s3-ap-northeast-1.amazonaws.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "connpass-tokyo.s3.amazonaws.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "files.speakerdeck.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cssnite-osaka.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cssnite.jp",
        port: "",
      },
      {
        protocol: "https",
        hostname: "qiita-user-contents.imgix.net",
        port: "",
      },
      {
        protocol: "https",
        hostname: "connpass-tokyo.s3.amazonaws.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },
    ],
  },
};

module.exports = withVanillaExtract(nextConfig);

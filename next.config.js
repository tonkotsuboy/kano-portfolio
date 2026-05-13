/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {},
  staticPageGenerationTimeout: 240,
  // React 19 canary + View Transitions API（Baseline 2025）統合。
  // App Router が router.push を `document.startViewTransition()` でラップし、
  // <ViewTransition name="..."> でラップした要素間でモーフィングが発火する。
  experimental: {
    viewTransition: true,
  },
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
      {
        // 現代ブラウザのデフォルトと同じだが、明示することで「rel="noreferrer"
        // を付けない」という外部リンクポリシー（DESIGN.md §7 /
        // .claude/rules/react-typescript.md）の前提を可視化する。
        source: "/(.*)",
        headers: [
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
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

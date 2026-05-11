const config = {
  plugins: {
    // Next.js のデフォルト PostCSS 設定を再現（カスタム config 追加時に自動無効化されるため）
    "postcss-flexbugs-fixes": {},
    "postcss-preset-env": {
      autoprefixer: { flexbox: "no-2009" },
      features: { "custom-properties": false },
      stage: 3,
    },
    // :hover を @media (hover: hover) でラップし、タッチデバイスでのホバー固着を防ぐ
    "postcss-hover-media-feature": {},
  },
};

export default config;

const config = {
  plugins: {
    "postcss-flexbugs-fixes": {},
    "postcss-preset-env": {
      autoprefixer: { flexbox: "no-2009" },
      features: { "custom-properties": false },
      stage: 3,
    },
    "postcss-hover-media-feature": {},
  },
};

export default config;

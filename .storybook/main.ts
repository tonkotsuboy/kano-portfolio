import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  staticDirs: ["../public", "./test-assets"],
  stories: ["../app/**/*.stories.@(ts|tsx)"],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
  ],

  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },

  docs: {},

  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
};

export default config;

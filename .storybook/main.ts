import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
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

  async viteFinal(config) {
    config.plugins = config.plugins ?? [];
    config.plugins.push(vanillaExtractPlugin());
    return config;
  },

  docs: {},

  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
};

export default config;

import path from "node:path";
import { fileURLToPath } from "node:url";

import type { StorybookConfig } from "@storybook/nextjs-vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  staticDirs: ["../public", "./test-assets"],
  stories: ["../app/**/*.stories.@(ts|tsx)"],

  viteFinal: async (config) => {
    config.optimizeDeps ||= {};
    config.optimizeDeps.include = [...(config.optimizeDeps.include || []), "vitest"];
    config.resolve ||= {};
    const aliases =
      config.resolve.alias && !Array.isArray(config.resolve.alias)
        ? config.resolve.alias
        : {};

    const veliteMock = path.resolve(__dirname, "./mocks/velite.ts");
    config.resolve.alias = {
      ...(Array.isArray(config.resolve.alias) ? {} : aliases),
      "@/.velite": veliteMock,
      ".velite": veliteMock,
      "../.velite": veliteMock,
      "next/navigation": path.resolve(__dirname, "./mocks/nextNavigation.ts"),
    };
    return config;
  },

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

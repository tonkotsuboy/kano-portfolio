import type { Preview } from "@storybook/nextjs-vite";

import "../app/styles/reset.css";
import "../app/styles/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;

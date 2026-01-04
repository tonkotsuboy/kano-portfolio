import type { Preview } from "@storybook/nextjs-vite";

import "../app/styles/reset.css";
import "../app/styles/globals.css";
import { ThemeProvider } from "../app/features/theme/ThemeProvider";
import { AppRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <AppRouterContext.Provider
        // Minimal router implementation to satisfy useRouter in stories
        value={{
          back: () => window.history.back(),
          forward: () => window.history.forward(),
          prefetch: async () => {},
          push: (href) => window.history.pushState(null, "", href),
          refresh: () => window.location.reload(),
          replace: (href) => window.history.replaceState(null, "", href),
        } as unknown as typeof AppRouterContext}
      >
        <ThemeProvider>
          <Story />
        </ThemeProvider>
      </AppRouterContext.Provider>
    ),
  ],
};

export default preview;

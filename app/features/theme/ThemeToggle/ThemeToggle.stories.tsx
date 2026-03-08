import { ThemeProvider } from "../ThemeProvider";

import { ThemeToggle } from "./ThemeToggle";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  component: ThemeToggle,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: { layout: "centered" },
  title: "Features/ThemeToggle",
} satisfies Meta<typeof ThemeToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

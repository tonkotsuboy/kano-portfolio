import { Footer } from "./Footer";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  component: Footer,
  parameters: { layout: "fullscreen" },
  title: "Features/Footer",
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

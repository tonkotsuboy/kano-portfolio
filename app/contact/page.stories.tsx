import ContactPage from "./page";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  component: ContactPage,
  parameters: { layout: "fullscreen" },
  title: "Pages/Contact",
} satisfies Meta<typeof ContactPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

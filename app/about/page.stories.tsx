import AboutPage from "./page";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  component: AboutPage,
  parameters: { layout: "fullscreen" },
  title: "Pages/About",
} satisfies Meta<typeof AboutPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

import HomePage from "./page";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  component: HomePage,
  parameters: { layout: "fullscreen" },
  title: "Pages/Home",
} satisfies Meta<typeof HomePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

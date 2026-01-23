import HomePage from "./page";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: HomePage,
  parameters: { layout: "fullscreen" },
  title: "Pages/Home",
} satisfies Meta<typeof HomePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

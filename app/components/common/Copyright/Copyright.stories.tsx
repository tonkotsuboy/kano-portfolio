import { Copyright } from "./Copyright";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Copyright,
} satisfies Meta<typeof Copyright>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

import { TimeDisplay } from "./TimeDisplay";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: TimeDisplay,
  args: {
    updateInterval: 1000,
  },
} satisfies Meta<typeof TimeDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FastUpdate: Story = {
  args: {
    updateInterval: 100,
  },
};

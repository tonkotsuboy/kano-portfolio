import { MenuButton } from "./MenuButton";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  args: {
    isClosed: false,
  },
  component: MenuButton,
} satisfies Meta<typeof MenuButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const IsClosed: Story = {
  args: {
    isClosed: true,
  },
};

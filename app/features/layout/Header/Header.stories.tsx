import { Header } from "./Header";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  title: "Features/Header",
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WorksActive: Story = {
  args: {
    currentPath: "/",
  },
};

export const AboutActive: Story = {
  args: {
    currentPath: "/about",
  },
};

export const ContactActive: Story = {
  args: {
    currentPath: "/contact",
  },
};

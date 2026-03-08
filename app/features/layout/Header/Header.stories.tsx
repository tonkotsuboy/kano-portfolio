import { Header } from "./Header";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  component: Header,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/",
      },
    },
  },
  title: "Features/Header",
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AboutActive: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/about",
      },
    },
  },
};

export const ContactActive: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/contact",
      },
    },
  },
};

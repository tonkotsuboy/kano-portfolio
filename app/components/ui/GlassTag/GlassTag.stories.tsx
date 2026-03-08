import { GlassTag } from "./GlassTag";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  component: GlassTag,
  parameters: { layout: "centered" },
  title: "UI/GlassTag",
} satisfies Meta<typeof GlassTag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Next.js",
  },
};

export const Multiple: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <GlassTag>Next.js</GlassTag>
      <GlassTag>TypeScript</GlassTag>
      <GlassTag>CSS Modules</GlassTag>
    </div>
  ),
};

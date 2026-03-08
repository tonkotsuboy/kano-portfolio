import { GlassSurface } from "./GlassSurface";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  component: GlassSurface,
  parameters: { layout: "centered" },
  title: "UI/GlassSurface",
} satisfies Meta<typeof GlassSurface>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div style={{ padding: "2rem 3rem" }}>
        <h3 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.5rem" }}>
          Glass Surface
        </h3>
        <p style={{ fontSize: "0.875rem", opacity: 0.8 }}>
          シンプルなグラスモーフィズムラッパー
        </p>
      </div>
    ),
  },
};

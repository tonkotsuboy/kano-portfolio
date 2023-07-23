import { LinkCard } from "./LinkCard";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: LinkCard,
  args: {
    linkUrl: "https://example.com",
    metaInfo: {
      ogImage: "/sample-image.jpg",
      ogTitle: `CSS Nyait in Los Angeles vol.12 Mofumofu Coding 2024 〜 箱からはみ出している猫たちに贈るスペシャルごはん7選`,
      ogDescription: "説明",
    },
  },
} satisfies Meta<typeof LinkCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: (args) => {
    return (
      <div style={{ display: "grid", gap: "24px" }}>
        <section>
          <h2>親要素幅が500px未満のとき</h2>
          <div style={{ width: "460px" }}>
            <LinkCard {...args} />
          </div>
        </section>

        <section>
          <h2>親要素幅が500px以上のとき</h2>
          <div style={{ width: "800px" }}>
            <LinkCard {...args} />
          </div>
        </section>
      </div>
    );
  },
};

import { LinkCard } from "./LinkCard";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: LinkCard,
  args: {
    linkUrl: "https://example.com",
    metaInfo: {
      ogImage: "https://picsum.photos/id/13/200/300",
      ogTitle: "リンクタイトル",
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
          <h2>Large</h2>
          <div style={{ width: "500px" }}>
            <LinkCard {...args} />
          </div>
        </section>

        <section>
          <h2>Small</h2>
          <div style={{ width: "800px" }}>
            <LinkCard {...args} />
          </div>
        </section>
      </div>
    );
  },
};

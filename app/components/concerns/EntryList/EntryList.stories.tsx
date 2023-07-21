import { EntryList } from "./EntryList";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: EntryList,
  args: {
    listTitle: "タイトル",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    entryDataList: new Array(5).fill(true).map((_, index) => {
      return {
        id: `${index + 1}`,
        medium: {
          slug: "writing",
          name: "Medium名",
        },
        metaInfo: {
          ogImage: "https://picsum.photos/id/13/200/300",
          ogTitle: "リンクタイトル",
          ogDescription: "説明",
        },

        published_date: "2023-12-12",
        slug: "writing",
        tags: [
          {
            id: "2",
            name: "タグ名",
            order: 0,
            slug: "my-tag",
          },
        ],
        title: `記事タイトル${index + 1}`,
        url: "https://example.com",
      };
    }),
  },
} satisfies Meta<typeof EntryList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

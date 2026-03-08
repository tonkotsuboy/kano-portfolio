import { ArticleCard } from "./ArticleCard";

import type { Post } from "@/.velite";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const basePost: Post = {
  body: "",
  categories: [],
  date: "2025-06-01T00:00:00.000Z",
  hasDetail: true,
  medium: "Zenn",
  permalink: "/entry/sample-article",
  published: true,
  slug: "sample-article",
  tags: ["Next.js", "TypeScript", "CSS"],
  thumbnail: "",
  title: "Next.js 15 App Router で始めるモダンWeb開発",
};

const meta = {
  component: ArticleCard,
  parameters: {
    layout: "centered",
    nextjs: { appDirectory: true },
  },
  title: "Features/ArticleCard",
} satisfies Meta<typeof ArticleCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    post: basePost,
  },
};

export const WithThumbnail: Story = {
  args: {
    post: {
      ...basePost,
      thumbnail: "/ogimage.png",
      title: "サムネイル付きの記事カード",
    },
  },
};

export const ExternalLink: Story = {
  args: {
    post: {
      ...basePost,
      hasDetail: false,
      medium: "Qiita",
      targetUrl: "https://qiita.com/example",
      title: "外部リンクの記事（Qiita）",
    },
  },
};

export const ZennArticle: Story = {
  args: {
    post: {
      ...basePost,
      hasDetail: false,
      linkUrl: "https://zenn.dev/example",
      medium: "Zenn",
      title: "Zenn で公開された記事",
    },
  },
};

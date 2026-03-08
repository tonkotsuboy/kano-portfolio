import { ArticleGrid } from "./ArticleGrid";

import type { Post } from "@/.velite";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const generatePosts = (count: number): Post[] =>
  Array.from({ length: count }, (_, i) => ({
    body: "",
    categories: [],
    date: new Date(2025, 5 - Math.floor(i / 3), 28 - i).toISOString(),
    hasDetail: true,
    medium: ["Zenn", "Qiita", ""][i % 3] ?? "",
    permalink: `/entry/post-${String(i + 1)}`,
    published: true,
    slug: `post-${String(i + 1)}`,
    tags: [
      ["Next.js", "TypeScript"],
      ["React", "CSS"],
      ["JavaScript", "Node.js"],
    ][i % 3] ?? [],
    thumbnail: "",
    title: `サンプル記事タイトル ${String(i + 1)} - テスト用のダミー記事です`,
  }));

const meta = {
  component: ArticleGrid,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/",
        searchParams: new URLSearchParams(),
      },
    },
  },
  title: "Features/ArticleGrid",
} satisfies Meta<typeof ArticleGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    posts: generatePosts(15),
  },
};

export const FewArticles: Story = {
  args: {
    posts: generatePosts(3),
  },
};

export const Empty: Story = {
  args: {
    posts: [],
  },
};

export type Post = {
  body: string;
  categories: string[];
  date: string;
  hasDetail: boolean;
  medium: string;
  permalink: string;
  published: boolean;
  slug: string;
  tags: string[];
  targetUrl: string;
  thumbnail: string;
  title: string;
};

const mockPosts: Post[] = [
  {
    body: "",
    categories: [],
    date: "2025-01-01",
    hasDetail: true,
    medium: "Blog",
    permalink: "/entry/mock-post",
    published: true,
    slug: "mock-post",
    tags: ["Storybook", "Mock"],
    targetUrl: "/entry/mock-post",
    thumbnail: "/images/og/default.png",
    title: "モック記事",
  },
];

export const posts = mockPosts;

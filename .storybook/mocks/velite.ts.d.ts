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

export const posts: Post[];

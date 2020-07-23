export type BlogType = {
  id: string;
  title: string;
  published_date: string;
  url: string;
  detail?: string;
  medium: {
    title: string;
    slug: string;
  };
};

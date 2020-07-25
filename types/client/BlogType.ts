import { TagType } from "./TagType";

export type BlogType = {
  id: string;
  title: string;
  published_date: string;
  url: string;
  detail?: string;
  medium: {
    name: string;
    slug: string;
  };
  tags: TagType[];
};

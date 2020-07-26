import { TagType } from "./TagType";

export type EntryType = {
  id: string;
  title: string;
  published_date: string;
  url: string;
  detail?: object;
  medium: {
    name: string;
    slug: string;
  };
  tags: TagType[];
};

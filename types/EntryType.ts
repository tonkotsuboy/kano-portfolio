import { TagType } from "./TagType";

export type EntryType = {
  id: string;
  title: string;
  published_date: string;
  url: string;
  detail?: Document;
  medium: {
    name: string;
    slug: string;
  };
  tags: TagType[];
  slide: {
    title: string;
    file: {
      url: string;
    };
  } | null;
};

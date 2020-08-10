import { TagType } from "./TagType";
import { Asset } from "contentful";

export type EntryType = {
  id: string;
  title: string;
  published_date: string;
  ogImage?: string;
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
  keyvisual?: Asset;
};

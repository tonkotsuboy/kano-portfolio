import { Asset } from "contentful";
import { TagType } from "./TagType";

export type EntryType = {
  slug: string;
  id: string;
  title: string;
  published_date: string;
  url?: string;
  detail?: Document;
  medium: {
    name: string;
    slug: string;
  };
  videoUrl?: string;
  tags: TagType[];
  slide: {
    title: string;
    file: {
      url: string;
    };
  } | null;
  keyvisual?: Asset;
  ogInfo?: {
    title?: string;
    image?: string;
  };
};

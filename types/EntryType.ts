import { Asset } from "contentful";
import { Document } from "@contentful/rich-text-types";
import { TagType } from "./TagType";

export type EntryType = {
  slug: string;
  id: string;
  title: string;
  published_date: string;
  url?: string;
  metaInfo?: {
    ogTitle: string | null;
    ogImage: string | null;
    ogDescription: string | null;
  };
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
};

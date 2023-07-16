import type { MediumType } from "./MediumType";
import type { TagType } from "./TagType";
import type { Document } from "@contentful/rich-text-types";
import type { Asset } from "contentful";

export type EntryType = {
  detail?: Document;
  id: string;
  medium: MediumType | undefined;
  metaInfo?:
    | {
        ogDescription: string | null;
        ogImage: string | null;
        ogTitle: string | null;
      }
    | undefined;
  published_date?: string;
  slide?: Asset<"WITHOUT_UNRESOLVABLE_LINKS"> | undefined;
  slug: string;
  tags?: TagType[];
  title?: string;
  url?: string;
  videoUrl?: string;
};

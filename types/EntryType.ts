import type { Asset } from "contentful";
import type { Document } from "@contentful/rich-text-types";
import type { AssetFile } from "contentful/dist/types/types/asset";
import type { TagType } from "./TagType";
import type { MediumType } from "./MediumType";

export type EntryType = {
  slug: string;
  id: string;
  title?: string;
  published_date?: string;
  url?: string;
  metaInfo?:
    | {
        ogTitle: string | null;
        ogImage: string | null;
        ogDescription: string | null;
      }
    | undefined;
  detail?: Document;
  tags?: TagType[];
  medium: MediumType | undefined;
  videoUrl?: string;
  slide?: Asset<"WITHOUT_UNRESOLVABLE_LINKS"> | undefined;
  keyvisual:
    | {
        title?: string;
        description?: string;
        file?: AssetFile;
      }
    | undefined;
};

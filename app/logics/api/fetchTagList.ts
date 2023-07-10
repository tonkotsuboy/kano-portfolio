import type { TagType } from "../../types/TagType";
import { client } from "./contentfulClient";
import type { TypeTagSkeleton } from "../../@types/generated/contentful";

/**
 * タグ一覧を取得します
 */
export const fetchTagList = async (): Promise<TagType[]> => {
  const result =
    await client.withoutUnresolvableLinks.getEntries<TypeTagSkeleton>({
      content_type: "tag",
    });

  return result.items
    .map((item) => ({
      id: item.sys.id,
      ...item.fields,
    }))
    .sort((a, b) => a.order - b.order);
};

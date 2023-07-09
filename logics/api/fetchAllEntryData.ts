import type { EntryType } from "../../types/EntryType";
import { client } from "./contentfulClient";
import type { TypePortfolioSkeleton } from "../../@types/generated/contentful";
import type { TagType } from "../../types/TagType";

/**
 * 記事データをすべて取得します
 */
export const fetchAllEntryData = async (): Promise<EntryType[]> => {
  const allPortfolioData =
    await client.withoutUnresolvableLinks.getEntries<TypePortfolioSkeleton>({
      content_type: "portfolio",
      // 発表日の新しい順にソートする
      // order: "-fields.update_at",
      // 最大取得件数を200に
      limit: 200,
    });

  return allPortfolioData.items.map((entry) => {
    const tags: TagType[] = entry.fields.tags
      .map((tagEntry) => {
        return tagEntry?.fields;
      })
      .filter((tag): tag is TagType => tag != null);

    return {
      id: entry.sys.id,
      ...entry.fields,
      medium: entry.fields.medium?.fields,
      slide: entry.fields.slide?.fields ?? null,
      tags,
    };
  });
};

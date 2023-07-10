import type { EntryType } from "../../types/EntryType";
import { client } from "./contentfulClient";
import type { TypePortfolioSkeleton } from "../../@types/generated/contentful";
import dayjs from "dayjs";

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

  return allPortfolioData.items
    .map((entry) => {
      return {
        id: entry.sys.id,
        ...entry.fields,
        medium: entry.fields.medium?.fields ?? undefined,
        tags: entry.fields.tags.map((tag) => {
          if (tag == null) {
            throw new Error("tag is null");
          }

          return {
            id: tag.sys.id,
            slug: tag.fields.slug,
            name: tag.fields.name,
            order: tag.fields.order,
          };
        }),
      };
    })
    .sort((a, b) => {
      // 日付順でソート
      return dayjs(a.published_date).isAfter(dayjs(b.published_date)) ? -1 : 1;
    });
};

/**
 * 記事データをひとつ取得します
 */
export const fetchEntryData = async (id: string): Promise<EntryType | null> => {
  const allEntries = await fetchAllEntryData();
  return allEntries.find((entry) => entry.slug === id) ?? null;
};

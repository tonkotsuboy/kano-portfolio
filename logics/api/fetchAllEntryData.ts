import { fetchDataFromAPI } from "./fetchDataFromAPI";
import { PortfolioModel } from "../../types/server/PortfolioModel";
import { EntryType } from "../../types/EntryType";

/**
 * 記事データをすべて取得します
 */
export const fetchAllEntryData = async (): Promise<EntryType[]> => {
  const allPortfolioData = await fetchDataFromAPI<PortfolioModel>("portfolio", {
    // 発表日の新しい順にソートする
    order: "-fields.published_date",
    // 最大取得件数を200に
    limit: 200,
  });

  return allPortfolioData.map((entry) => {
    const tags: EntryType["tags"] = entry.fields.tags.map(
      (tagEntry) => tagEntry.fields
    );

    return {
      id: entry.sys.id,
      ...entry.fields,
      medium: entry.fields.medium.fields,
      slide: entry.fields.slide?.fields ?? null,
      tags,
    };
  });
};

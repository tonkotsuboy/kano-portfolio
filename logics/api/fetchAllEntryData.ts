import { fetchDataFromAPI } from "./fetchDataFromAPI";
import { PortfolioModel } from "../../types/server/PortfolioModel";
import { EntryType } from "../../types/EntryType";

/**
 * 記事データをすべて取得します
 */
export const fetchAllEntryData = async (): Promise<EntryType[]> => {
  const allPortfolioData = await fetchDataFromAPI<PortfolioModel>("portfolio");

  return allPortfolioData.items
    .map((entry) => {
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
    })
    .sort(
      (a, b) =>
        new Date(b.published_date).getTime() -
        new Date(a.published_date).getTime()
    );
};

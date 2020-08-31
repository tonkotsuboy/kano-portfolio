import { TagType } from "../../types/TagType";
import { fetchDataFromAPI } from "./fetchDataFromAPI";

/**
 * タグ一覧を取得します
 */
export const fetchTagList = (): Promise<TagType[]> =>
  fetchDataFromAPI<TagType>("tag").then((data) => {
    const tagList: TagType[] = data.items
      .map((item) => {
        return item.fields;
      })
      .sort((a, b) => a.order - b.order);
    return tagList;
  });

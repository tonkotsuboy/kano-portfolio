import { TagType } from "../../types/TagType";
import { fetchEntriesData } from "./fetchEntriesData";

/**
 * タグ一覧を取得します
 */
export const fetchTagList = (): Promise<TagType[]> =>
  fetchEntriesData<TagType>("tag").then((data) => {
    const tagList: TagType[] = data.items
      .map((item) => {
        return item.fields;
      })
      .sort((a, b) => a.order - b.order);
    return tagList;
  });

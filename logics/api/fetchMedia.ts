import { MediumType } from "../../types/MediumType";
import { fetchEntriesData } from "./fetchEntriesData";

/**
 * 媒体一覧を取得します
 */
export const fetchMedia = (): Promise<MediumType[]> =>
  fetchEntriesData<MediumType>("medium").then((data) => {
    const mediumList: MediumType[] = data.items.map((item) => {
      return item.fields;
    });
    return mediumList;
  });

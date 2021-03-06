import { MediumType } from "../../types/MediumType";
import { fetchDataFromAPI } from "./fetchDataFromAPI";

/**
 * 媒体一覧を取得します
 */
export const fetchMedia = (): Promise<MediumType[]> =>
  fetchDataFromAPI<MediumType>("medium").then((data) => {
    const mediumList: MediumType[] = data.items.map((item) => {
      return item.fields;
    });
    return mediumList;
  });

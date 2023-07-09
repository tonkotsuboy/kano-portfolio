import type { MediumType } from "../../types/MediumType";
import { client } from "./contentfulClient";
import type { TypeMediumSkeleton } from "../../../@types/generated/contentful";

/**
 * 媒体一覧を取得します
 */
export const fetchMedia = async (): Promise<MediumType[]> => {
  const result =
    await client.withoutUnresolvableLinks.getEntries<TypeMediumSkeleton>({
      content_type: "medium",
    });

  return result.items.map((item) => item.fields);
};

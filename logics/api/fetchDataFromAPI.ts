import { ContentfulClientApi, Entry, createClient } from "contentful";

/**
 * contentful用のclientAPIです
 */
const client: ContentfulClientApi = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID ?? "",
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN ?? "",
});

/**
 * content_typeを指定して、エントリーデータをフェッチします
 * @param contentType
 * @param optionalQuery
 */
export const fetchDataFromAPI = async <T>(
  contentType: string,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  optionalQuery?: any
): Promise<Entry<T>[]> => {
  const { items } = await client.getEntries<T>({
    content_type: contentType,
    ...optionalQuery,
  });

  return items;
};

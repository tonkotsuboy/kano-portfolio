import { ContentfulClientApi, EntryCollection } from "contentful";

const contentful = require("contentful");

/**
 * contentful用のclientAPIです
 */
const client: ContentfulClientApi = contentful.createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

/**
 * content_typeを指定して、エントリーデータをフェッチします
 * @param contentType
 */
export const fetchDataFromAPI = async <T>(
  contentType: string,
  optionalQuery?: any
): Promise<EntryCollection<T>> => {
  const result = await client.getEntries<T>({
    content_type: contentType,
    ...optionalQuery,
  });

  return result;
};

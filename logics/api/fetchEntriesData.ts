import { ContentfulClientApi, Entry, EntryCollection } from "contentful";

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
export const fetchEntriesData = async <T>(
  contentType: string
): Promise<EntryCollection<T>> => {
  return await client.getEntries<T>({
    content_type: contentType,
  });
};

/**
 * entry_idを指定して、エントリーデータを取得します
 * @param entryId
 */
export const fetchEntryData = async <T>(entryId: string): Promise<Entry<T>> => {
  const result = await client.getEntry<T>(entryId);
  return result;
};

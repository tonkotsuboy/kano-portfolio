import type { Metadata, NextPage } from "next";

import { EntryList } from "../../components/concerns/EntryList";
import { fetchAllEntryData } from "../../logics/api/fetchAllEntryData";
import { container } from "./page.css";
import { Copyright } from "../../components/concerns/Copyright";
import { fetchTagList } from "../../logics/api/fetchTagList";
import { metadata } from "../../layout";
import { WithSiteTitle } from "../../constants";
import { getMetaDataForEntryDataList } from "../../logics/scraping/getMetaDataForEntryDataList";

export const generateStaticParams = async (): Promise<string[]> => {
  const tagData = await fetchTagList();
  return tagData.map((tag) => {
    return `/tag/${tag.slug}`;
  });
};

type Params = { params: { slug: string } };

const getEntryData = async (slug: string) => {
  const entryDataList = (await fetchAllEntryData()).filter((entryData) => {
    // タグ内に、paramのタグが含まれているかどうか？
    return entryData.tags?.some((tagData) => tagData.slug === slug);
  });

  return {
    entryDataList,
  };
};

export const generateMetadata = async ({
  params,
}: Params): Promise<Metadata> => {
  const tagData = await fetchTagList();

  const tagTitle = tagData.find((tag) => tag.slug === params.slug)?.name ?? "";

  const title = `${tagTitle}${WithSiteTitle}`;

  return {
    ...metadata,
    title: title,
    twitter: {
      ...metadata.twitter,
      title,
    },
    openGraph: {
      ...metadata.openGraph,
      title,
    },
  };
};
const Page: NextPage<Params> = async ({ params }) => {
  const { entryDataList } = await getEntryData(params.slug);

  const tagTitle = entryDataList[0]?.tags?.[0]?.name ?? "";

  await getMetaDataForEntryDataList(entryDataList, 12);

  return (
    <div className={container}>
      <EntryList listTitle={tagTitle} entryDataList={entryDataList} />
      <Copyright />
    </div>
  );
};

export default Page;

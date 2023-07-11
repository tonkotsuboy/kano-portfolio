import type { NextPage, Metadata } from "next";

import { EntryList } from "../../components/concerns/EntryList";
import { fetchAllEntryData } from "../../logics/api/fetchAllEntryData";
import { container } from "./page.css";
import { Copyright } from "../../components/concerns/Copyright";
import { fetchMedia } from "../../logics/api/fetchMedia";
import { WithSiteTitle } from "../../constants";
import { metadata } from "../../layout";
import { getMetaDataForEntryDataList } from "../../logics/scraping/getMetaDataForEntryDataList";

export const generateStaticParams = async (): Promise<string[]> => {
  const mediumData = await fetchMedia();
  return mediumData.map((tag) => {
    return `/medium/${tag.slug}`;
  });
};

const getEntryData = async (slug: string) => {
  const entryDataList = (await fetchAllEntryData()).filter(
    (entryData) =>
      // paramのmediaが含まれているかどうか？
      entryData.medium?.slug === slug,
  );

  return {
    entryDataList,
  };
};

type Params = { params: { slug: string } };

export const generateMetadata = async ({
  params,
}: Params): Promise<Metadata> => {
  const { entryDataList } = await getEntryData(params.slug);
  const title = `${entryDataList[0]?.medium?.name ?? ""}${WithSiteTitle}`;

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

  await getMetaDataForEntryDataList(entryDataList, 12);

  return (
    <div className={container}>
      <EntryList entryDataList={entryDataList} />
      <Copyright />
    </div>
  );
};

export default Page;

import { Copyright } from "../../components/concerns/Copyright";
import { EntryList } from "../../components/concerns/EntryList";
import { WithSiteTitle } from "../../constants";
import { metadata } from "../../layout";
import { fetchAllEntryData } from "../../logics/api/fetchAllEntryData";
import { fetchMedia } from "../../logics/api/fetchMedia";
import { getMetaDataForEntryDataList } from "../../logics/scraping/getMetaDataForEntryDataList";

import * as styles from "./page.css";

import type { Metadata, NextPage } from "next";

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
    <div className={styles.container}>
      <EntryList
        listTitle={entryDataList[0]?.medium?.name ?? ""}
        entryDataList={entryDataList}
      />
      <Copyright />
    </div>
  );
};

export default Page;

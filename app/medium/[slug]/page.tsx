import type { NextPage } from "next";

import { EntryList } from "../../components/concerns/EntryList";
import { fetchAllEntryData } from "../../../logics/api/fetchAllEntryData";
import { container } from "./page.css";
import { Copyright } from "../../components/concerns/Copyright";
import { fetchMedia } from "../../../logics/api/fetchMedia";

export const generateStaticParams = async (): Promise<string[]> => {
  const mediumData = await fetchMedia();
  return mediumData.map((tag) => {
    return `/medium/${tag.slug}`;
  });
};

const getEntryData = async (params: { slug: string }) => {
  const entryDataList = (await fetchAllEntryData()).filter(
    (entryData) =>
      // paramのmediaが含まれているかどうか？
      entryData.medium?.slug === params.slug,
  );

  return {
    entryDataList,
  };
};

type Params = { params: { slug: string } };

const Page: NextPage<Params> = async ({ params }) => {
  const { entryDataList } = await getEntryData(params);

  return (
    <div className={container}>
      <EntryList entryDataList={entryDataList} />
      <Copyright />
    </div>
  );
};

export default Page;

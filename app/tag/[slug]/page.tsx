import type { NextPage } from "next";

import { EntryList } from "../../components/concerns/EntryList";
import { fetchAllEntryData } from "../../../logics/api/fetchAllEntryData";
import { container } from "./page.css";
import { Copyright } from "../../components/concerns/Copyright";
import { fetchTagList } from "../../../logics/api/fetchTagList";

export const generateStaticParams = async (): Promise<string[]> => {
  const tagData = await fetchTagList();
  return tagData.map((tag) => {
    return `/tag/${tag.slug}`;
  });
};

const getEntryData = async (params: { slug: string }) => {
  const entryDataList = (await fetchAllEntryData()).filter((entryData) => {
    // タグ内に、paramのタグが含まれているかどうか？
    return entryData.tags?.some((tagData) => tagData.slug === params.slug);
  });

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

import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { fetchDataFromAPI } from "../../logics/api/fetchDataFromAPI";

import type { IndexContextType } from "../../contexts/IndexContext";
import { IndexContext } from "../../contexts/IndexContext";
import BasePage from "../../components/base/BasePage";
import type { TagType } from "../../types/TagType";
import type { MediumType } from "../../types/MediumType";
import type { EntryType } from "../../types/EntryType";
import { EntryList } from "../../components/entry/EntryList";
import { fetchMedia } from "../../logics/api/fetchMedia";
import { fetchTagList } from "../../logics/api/fetchTagList";
import { fetchAllEntryData } from "../../logics/api/fetchAllEntryData";

export const getStaticPaths: GetStaticPaths = async () => {
  // Get the paths we want to pre-render based on posts
  const tagData = await fetchDataFromAPI<TagType>("tag");
  const paths = tagData.map((tag) => `/tag/${tag.fields.slug}`);
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // 選択されたタグ
  const selectedTagSlag = params?.id as string;
  if (selectedTagSlag == null) {
    return {
      props: {
        tagData: null,
      },
    };
  }

  const [mediumDataList, tagDataList]: [MediumType[], TagType[]] =
    await Promise.all([fetchMedia(), fetchTagList()]);

  const allEntryDataList = await fetchAllEntryData();

  // 全エントリーデータより、特定のタグを絞り込む
  const entryDataList = allEntryDataList.filter((entryData) =>
    // タグ内に、paramのタグが含まれているかどうか？
    entryData.tags.some((tagData) => tagData.slug === selectedTagSlag)
  );

  return {
    props: {
      selectedTagSlag,
      entryDataList,
      mediumDataList,
      tagDataList,
    },
  };
};

const TagPage: NextPage<{
  selectedTagSlag: string;
  entryDataList: EntryType[];
  mediumDataList: MediumType[];
  tagDataList: TagType[];
}> = ({ selectedTagSlag, entryDataList, mediumDataList, tagDataList }) => {
  const contextValue: IndexContextType = {
    selectedTag: selectedTagSlag,
    entryDataList,
    mediumDataList,
    tagDataList,
  };

  // 選択されたタグの名前を取得します
  const selectedTagName = tagDataList.find(
    (tag) => tag.slug === selectedTagSlag
  )?.name;

  if (selectedTagName == null) {
    return null;
  }

  return (
    <IndexContext.Provider value={contextValue}>
      <BasePage pageTitle={selectedTagName}>
        <EntryList listTitle={`タグ：${selectedTagName}`} />
      </BasePage>
    </IndexContext.Provider>
  );
};

export default TagPage;

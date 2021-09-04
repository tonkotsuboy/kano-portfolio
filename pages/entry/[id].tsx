import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { PortfolioModel } from "../../types/server/PortfolioModel";
import { fetchDataFromAPI } from "../../logics/api/fetchDataFromAPI";

import { IndexContext, IndexContextType } from "../../contexts/IndexContext";
import BasePage from "../../components/base/BasePage";
import { TagType } from "../../types/TagType";
import DetailArticle from "../../components/detail/DetailArticle";
import { EntryType } from "../../types/EntryType";
import { MediumType } from "../../types/MediumType";
import { creteHTMLDocument } from "../../logics/scraping/creteHTMLDocument";
import { fetchMedia } from "../../logics/api/fetchMedia";
import { fetchTagList } from "../../logics/api/fetchTagList";
import { fetchHTMLText } from "../../logics/scraping/fetchHTMLText";
import { parseMetaInfo } from "../../logics/scraping/parseMetaInfo";

export const getStaticPaths: GetStaticPaths = async () => {
  // Get the paths we want to pre-render based on posts
  const portfolioData = await fetchDataFromAPI<PortfolioModel>("portfolio");
  const paths = portfolioData.map((entry) => `/entry/${entry.fields.slug}`);
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // 表示する記事のIDをパラメータから取得
  const targetEntryId = params?.id as string;
  if (targetEntryId == null) {
    return {
      props: {
        entryData: null,
      },
    };
  }

  const [entryData, mediumDataList, tagDataList]: [
    EntryType,
    MediumType[],
    TagType[]
  ] = await Promise.all([
    // slugを指定して記事詳細データを取得する
    fetchDataFromAPI<PortfolioModel>("portfolio", {
      "fields.slug": targetEntryId,
    }).then(async (dataList) => {
      const data = dataList[0];
      const tags: EntryType["tags"] = data.fields.tags.map(
        (tagEntry) => tagEntry.fields
      );

      const htmlText = await fetchHTMLText(data.fields.url);
      const htmlDocument = creteHTMLDocument(htmlText);
      const metaInfo = parseMetaInfo(htmlDocument);

      return {
        id: data.sys.id,
        ...data.fields,
        metaInfo,
        medium: data.fields.medium.fields,
        slide: data.fields.slide?.fields ?? null,
        tags,
      } as EntryType;
    }),
    fetchMedia(),
    fetchTagList(),
  ]);

  return {
    props: {
      entryData,
      mediumDataList,
      tagDataList,
    },
  };
};

const DetailPage: NextPage<{
  entryData: EntryType;
  mediumDataList: MediumType[];
  tagDataList: TagType[];
}> = ({ entryData, mediumDataList, tagDataList }) => {
  const contextValue: IndexContextType = {
    mediumDataList,
    tagDataList,
  };

  return (
    <IndexContext.Provider value={contextValue}>
      <BasePage
        pageTitle={entryData.title}
        pageDescription={entryData.metaInfo?.ogDescription}
      >
        <DetailArticle entryData={entryData} />
      </BasePage>
    </IndexContext.Provider>
  );
};

export default DetailPage;

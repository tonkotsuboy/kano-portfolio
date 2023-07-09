import type { NextPage } from "next";
import {
  fetchAllEntryData,
  fetchEntryData,
} from "../../../logics/api/fetchAllEntryData";
import { container, video } from "./page.css";
import { Copyright } from "../../components/concerns/Copyright";
import { EntryArticle } from "../../components/concerns/EntryList";
import { DetailHTML } from "../../components/concerns/DetailHTML/DetailHTML";
import { LinkCard } from "../../components/common/LinkCard";
import { fetchHTMLText } from "../../../logics/scraping/fetchHTMLText";
import { creteHTMLDocument } from "../../../logics/scraping/creteHTMLDocument";
import { parseMetaInfo } from "../../../logics/scraping/parseMetaInfo";

export const generateStaticParams = async (): Promise<string[]> => {
  const portfolioData = await fetchAllEntryData();
  return portfolioData.map((entry) => `/entry/${entry.slug}`);
};

const getEntryData = async (params: { slug: string }) => {
  const entryData = await fetchEntryData(params.slug);

  if (entryData == null) {
    throw new Error("entryData is null");
  }

  if (entryData.url) {
    const htmlText = await fetchHTMLText(entryData.url);
    const htmlDocument = creteHTMLDocument(htmlText);
    const metaInfo = parseMetaInfo(htmlDocument);
    entryData.metaInfo = metaInfo;
  }

  return {
    entryData,
  };
};

type Params = { params: { slug: string } };

const Page: NextPage<Params> = async ({ params }) => {
  const { entryData } = await getEntryData(params);

  return (
    <div className={container}>
      <EntryArticle entryData={entryData}>
        {/* ビデオ */}
        {entryData.videoUrl && (
          <iframe
            className={video}
            width="560"
            height="315"
            src={entryData.videoUrl}
            title={entryData.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
        {/* 記事詳細HTML */}
        {entryData.detail != null && (
          <DetailHTML detailDocument={entryData.detail} />
        )}

        {/* リンクカード */}
        {entryData.url && entryData.metaInfo && (
          <LinkCard linkUrl={entryData.url} metaInfo={entryData.metaInfo} />
        )}
      </EntryArticle>

      <Copyright />
    </div>
  );
};

export default Page;

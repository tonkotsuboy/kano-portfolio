import type { Metadata, NextPage } from "next";
import {
  fetchAllEntryData,
  fetchEntryData,
} from "../../logics/api/fetchAllEntryData";
import { container, video } from "./page.css";
import { Copyright } from "../../components/concerns/Copyright";
import { EntryArticle } from "../../components/concerns/EntryList";
import { DetailHTML } from "../../components/concerns/DetailHTML/DetailHTML";
import { LinkCard } from "../../components/common/LinkCard";
import { WithSiteTitle } from "../../constants";
import { metadata } from "../../layout";
import { getMetaDataForEntryDataList } from "../../logics/scraping/getMetaDataForEntryDataList";

export const generateStaticParams = async (): Promise<string[]> => {
  const portfolioData = await fetchAllEntryData();
  return portfolioData
    .filter((entry) => entry.medium?.slug !== "writing")
    .map((entry) => `/entry/${entry.slug}`);
};

const getEntryData = async (slug: string) => {
  const entryData = await fetchEntryData(slug);

  if (entryData == null) {
    throw new Error("entryData is null");
  }

  return {
    entryData,
  };
};

type Params = { params: { slug: string } };

export const generateMetadata = async ({
  params,
}: Params): Promise<Metadata> => {
  const { entryData } = await getEntryData(params.slug);

  const title = `${entryData.title ?? ""}${WithSiteTitle}`;

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
  const { entryData } = await getEntryData(params.slug);

  await getMetaDataForEntryDataList([entryData]);

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
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
        {/* 記事詳細HTML */}
        {entryData.detail != null && (
          <DetailHTML detailDocument={entryData.detail} />
        )}

        {/* リンクカード */}
        {entryData.url && (
          <LinkCard linkUrl={entryData.url} metaInfo={entryData.metaInfo} />
        )}
      </EntryArticle>

      <Copyright />
    </div>
  );
};

export default Page;

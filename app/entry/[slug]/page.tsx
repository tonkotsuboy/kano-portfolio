import { LinkCard } from "../../components/common/LinkCard";
import { Copyright } from "../../components/concerns/Copyright";
import { DetailHTML } from "../../components/concerns/DetailHTML/DetailHTML";
import { WithSiteTitle } from "../../constants";
import { metadata } from "../../layout";
import {
  fetchAllEntryData,
  fetchEntryData,
} from "../../logics/api/fetchAllEntryData";
import { parseDate } from "../../logics/date/parseDate";
import { getMetaDataForEntryDataList } from "../../logics/scraping/getMetaDataForEntryDataList";

import * as styles from "./page.css";

import type { Metadata, NextPage } from "next";

export const generateStaticParams = async (): Promise<string[]> => {
  const portfolioData = await fetchAllEntryData();
  return portfolioData
    .filter((entry) => entry.medium?.slug !== "writing")
    .map((entry) => `/entry/${entry.slug}`);
};

const getEntryData = async (slug: string) => {
  const entryData = await fetchEntryData(slug);

  if (entryData == null) {
    return Promise.reject("entryData is null");
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
    <div className={styles.container}>
      <article className={styles.article}>
        <header className={styles.header}>
          <p className={styles.medium}>{entryData.medium?.name}</p>
          <ul className={styles.tagList}>
            {entryData.tags
              ?.sort((a, b) => a.order - b.order)
              .map(({ slug, name }) => (
                <li key={slug} className={styles.tag}>
                  #{name}
                </li>
              ))}
          </ul>
        </header>
        <h2 className={styles.title}>{entryData.title}</h2>
        {entryData.published_date != null && (
          <p className={styles.publishedDate}>
            発表日
            <time dateTime={entryData.published_date}>
              {parseDate(entryData.published_date)}
            </time>
          </p>
        )}

        {/* ビデオ */}
        {entryData.videoUrl != null && (
          <iframe
            className={styles.video}
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
        {entryData.url != null && (
          <LinkCard linkUrl={entryData.url} metaInfo={entryData.metaInfo} />
        )}
      </article>

      <Copyright />
    </div>
  );
};

export default Page;

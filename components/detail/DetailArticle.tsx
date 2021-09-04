import { VFC } from "react";
import { EntryType } from "../../types/EntryType";
import { EntryArticle } from "../entry/EntryArticle";
import styles from "./DetailArticle.module.scss";
import { DetailHTML } from "./components/DetailHTML";
import { LinkCard } from "./components/LinkCard";

type Props = {
  entryData: EntryType;
};

/**
 * 記事詳細
 * @param entryData
 */
const DetailArticle: VFC<Props> = ({ entryData }) => (
  <EntryArticle entryData={entryData}>
    {/* ビデオ */}
    {entryData.videoUrl && (
      <iframe
        className={styles.video}
        title={entryData.title}
        src={entryData.videoUrl}
        loading="lazy"
        width="100%"
        height="360"
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
      />
    )}

    {/* スライドがある場合 */}
    {/* {entryData.slide && ( */}
    {/*  <iframe */}
    {/*    className={styles.slide} */}
    {/*    title={entryData.slide.title} */}
    {/*    src={`https:${entryData.slide.file.url}?view=Fit`} */}
    {/*    loading="lazy" */}
    {/*    width="100%" */}
    {/*    height="360" */}
    {/*  > */}
    {/*    <a href={`https:${entryData.slide.file.url}`}> */}
    {/*      {entryData.slide.title} */}
    {/*    </a> */}
    {/*  </iframe> */}
    {/* )} */}

    {/* 記事詳細HTML */}
    {entryData.detail != null && (
      <DetailHTML detailDocument={entryData.detail} />
    )}

    {entryData.medium.slug !== "lesson" &&
      entryData.metaInfo?.ogDescription && (
        <p>{entryData.metaInfo.ogDescription}</p>
      )}

    {/* リンクカード */}
    <LinkCard linkUrl={entryData.url} metaInfo={entryData.metaInfo} />
  </EntryArticle>
);

export default DetailArticle;

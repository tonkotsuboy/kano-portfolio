import React from "react";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { EntryType } from "../../types/EntryType";
import { EntryArticle } from "../common/EntryArticle";
import styles from "./DetailArticle.module.scss";

type Props = {
  entryData: EntryType;
};

const DetailArticle: React.FC<Props> = ({ entryData }) => {
  return (
    <EntryArticle entryData={entryData}>
      {entryData.detail != null ? (
        <div
          className={styles.entryhtml}
          dangerouslySetInnerHTML={{
            __html: documentToHtmlString(entryData.detail as any),
          }}
        />
      ) : null}

      {/* スライドがある場合 */}
      {entryData.slide ? (
        <iframe
          title={entryData.slide.title}
          src={`https:${entryData.slide.file.url}`}
          width="100%"
          height="400"
        >
          <a href={`https:${entryData.slide.file.url}`}>
            {entryData.slide.title}
          </a>
        </iframe>
      ) : null}

      {entryData.ogInfo ? (
        <aside className={styles.ogInfo}>
          <a href={entryData.url} rel="noopener noreferrer" target="_blank">
            {entryData.ogInfo.image ? (
              <img
                className={styles.ogImage}
                src={entryData.ogInfo.image}
                alt="entryData.ogInfo.title"
              />
            ) : null}
            <div className={styles.ogDetail}>
              <h4 className={styles.ogTitle}>{entryData.ogInfo.title}</h4>
              <p className={styles.linkUrl}>{entryData.url}</p>
            </div>
          </a>
        </aside>
      ) : null}
    </EntryArticle>
  );
};

export default DetailArticle;

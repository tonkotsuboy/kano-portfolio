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

      {entryData.ogInfo ? (
        <aside>
          {entryData.ogInfo.image ? (
            <img alt="" src={entryData.ogInfo.image} />
          ) : null}
          <h3>{entryData.ogInfo.title}</h3>
        </aside>
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
    </EntryArticle>
  );
};

export default DetailArticle;

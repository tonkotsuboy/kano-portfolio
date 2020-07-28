import React from "react";
import { EntryType } from "../../types/EntryType";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { EntryArticle } from "../common/EntryArticle";

type Props = {
  entryData: EntryType;
};

const DetailArticle: React.FC<Props> = ({ entryData }) => {
  return (
    <EntryArticle entryData={entryData}>
      {entryData.detail != null ? (
        <div
          dangerouslySetInnerHTML={{
            __html: documentToHtmlString(entryData.detail as any),
          }}
        />
      ) : null}

      {/* スライドがある場合 */}
      {entryData.slide ? (
        <iframe
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

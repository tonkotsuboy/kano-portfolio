import React from "react";
import {
  documentToHtmlString,
  Options,
} from "@contentful/rich-text-html-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { EntryType } from "../../types/EntryType";
import { EntryArticle } from "../common/EntryArticle";
import styles from "./DetailArticle.module.scss";

type Props = {
  entryData: EntryType;
};

const DetailArticle: React.FC<Props> = ({ entryData }) => {
  const renderingHTMLOption: Partial<Options> = {
    renderNode: {
      [INLINES.HYPERLINK]: (node, next) => {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        return `<a href="${node.data.uri}"${
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
          node.data.uri.startsWith("https://mydomain.com")
            ? ""
            : ' target="_blank"'
        }>${next(node.content)}</a>`;
      },
      [BLOCKS.EMBEDDED_ASSET]: ({
        data: {
          target: { fields },
        },
      }) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions
        `<img src="${fields.file.url}" height="${fields.file.details.image.height}" width="${fields.file.details.image.width}" alt="${fields.description}"/>`,
    },
  };

  return (
    <EntryArticle entryData={entryData}>
      {/* ビデオ */}
      {entryData.videoUrl ? (
        <iframe
          title={entryData.title}
          src={entryData.videoUrl}
          width="640"
          height="360"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      ) : null}

      {entryData.detail != null ? (
        <div
          className={styles.entryhtml}
          dangerouslySetInnerHTML={{
            __html: documentToHtmlString(
              entryData.detail as any,
              renderingHTMLOption
            ),
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

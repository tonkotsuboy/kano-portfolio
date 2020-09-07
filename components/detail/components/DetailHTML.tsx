/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions */
import React from "react";
import {
  documentToHtmlString,
  Options,
} from "@contentful/rich-text-html-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import styles from "./DetailHTML.module.scss";

/**
 * 記事詳細用HTMLを作成します
 */
const createDetailHTML = (detailDocument: Document): string => {
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
        `<picture>
            <source srcset="${fields.file.url}?fm=webp" type="image/webp" />
            <source srcset="${fields.file.url}?fm=jpg&q=50" type="image/jpeg" />
            <img
              loading="lazy"
              src="${fields.file.url}"
              alt="${fields.title}"
              width="${fields.file.details.image.width}"
              height="${fields.file.details.image.height}"
            />
          </picture>`,
    },
  };

  const detailHTML = documentToHtmlString(
    detailDocument as any,
    renderingHTMLOption
  );
  return detailHTML;
};
/**
 * 記事詳細用HTML用コンポーネント
 * @param detailDocument
 */
export const DetailHTML: React.FC<{ detailDocument: Document }> = ({
  detailDocument,
}) => {
  const detailHTML = createDetailHTML(detailDocument);

  return (
    <div
      className={styles.detailHTML}
      dangerouslySetInnerHTML={{
        __html: detailHTML,
      }}
    />
  );
};

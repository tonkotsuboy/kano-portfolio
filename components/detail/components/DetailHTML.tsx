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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions
        `<img loading="lazy" src="${fields.file.url}" width="${fields.file.details.image.width}" height="${fields.file.details.image.height}" alt="${fields.title}"/>`,
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

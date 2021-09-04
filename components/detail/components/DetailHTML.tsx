/* eslint-disable @typescript-eslint/no-unsafe-call, react/jsx-no-target-blank, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/restrict-template-expressions,@typescript-eslint/no-explicit-any */
import { BLOCKS, Document, INLINES } from "@contentful/rich-text-types";
import { VFC } from "react";
import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import styles from "./DetailHTML.module.scss";
import ExternalLink from "../../common/ExternalLink";

const renderOptions: Options = {
  renderNode: {
    [INLINES.HYPERLINK]: ({ content, data }) => {
      const linkText = (content[0] as any).value as string;
      return <ExternalLink url={data.uri} linkText={linkText} />;
    },
    [BLOCKS.EMBEDDED_ASSET]: ({
      data: {
        target: {
          fields: { file, title },
        },
      },
    }) => (
      // TODO: Imageコンポーネントを使いたい
      <picture>
        <source srcSet={`${file.url}?fm=webp`} type="image/webp" />
        <source srcSet={`${file.url}?fm=jpg&q=50`} type="image/jpeg" />
        <img
          loading="lazy"
          src={file.url}
          alt={title}
          width={file.details.image.width}
          height={file.details.image.height}
        />
      </picture>
    ),
  },
};
/**
 * 記事詳細用HTML用コンポーネント
 * @param detailDocument
 */
export const DetailHTML: VFC<{ detailDocument: Document }> = ({
  detailDocument,
}) => (
  <div className={styles.detailHTML}>
    {documentToReactComponents(detailDocument, renderOptions)}
  </div>
);

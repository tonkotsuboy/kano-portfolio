import React from "react";
import { createDetailHTML } from "./logics/createDetailHTML";
import styles from "./DetailHTML.module.scss";

type Props = { detailDocument: Document };

/**
 * 記事詳細用HTML用コンポーネント
 * @param detailDocument
 */
export const DetailHTML: React.FC<Props> = ({ detailDocument }) => {
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

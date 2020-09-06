import React from "react";
import styles from "./LinkCard.module.scss";
import { EntryType } from "../../../types/EntryType";

type Props = {
  linkUrl?: string;
  metaInfo: EntryType["metaInfo"];
};

/**
 * リンクカード。
 * og:image, og:titleが表示され、URLへのリンクを備えます
 */
export const LinkCard: React.FC<Props> = ({
  linkUrl,
  metaInfo: { ogTitle, ogImage },
}) => {
  if (linkUrl == null && ogTitle == null && ogImage == null) {
    return null;
  }

  return (
    <aside className={styles.linkCard}>
      <a href={linkUrl} rel="noopener noreferrer" target="_blank">
        {ogImage && (
          <img
            className={styles.ogImage}
            src={ogImage}
            alt="entryData.ogInfo.title"
          />
        )}
        <div className={styles.ogDetail}>
          <h4 className={styles.ogTitle}>{ogTitle}</h4>
          <p className={styles.linkUrl}>{linkUrl}</p>
        </div>
      </a>
    </aside>
  );
};

import { VFC } from "react";
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
export const LinkCard: VFC<Props> = ({ linkUrl, metaInfo }) => {
  if (
    linkUrl == null &&
    (metaInfo == null || (metaInfo.ogTitle == null && metaInfo.ogImage == null))
  ) {
    return null;
  }

  return (
    <aside className={styles.linkCard}>
      <a href={linkUrl} rel="noopener noreferrer" target="_blank">
        {metaInfo?.ogImage && (
          <img
            className={styles.ogImage}
            src={metaInfo.ogImage}
            width="628"
            height="257"
            alt="entryData.ogInfo.title"
          />
        )}
        <div className={styles.ogDetail}>
          {metaInfo?.ogTitle && (
            <h4 className={styles.ogTitle}>{metaInfo?.ogTitle}</h4>
          )}
          {linkUrl && <p className={styles.linkUrl}>{linkUrl}</p>}
        </div>
      </a>
    </aside>
  );
};

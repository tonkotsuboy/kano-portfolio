import type { FC } from "react";
import type { EntryType } from "../../../types/EntryType";
import Image from "next/image";
import * as styles from "./LinkCard.css";
import Link from "next/link";

type Props = {
  linkUrl: string;
  metaInfo: EntryType["metaInfo"];
};

/**
 * リンクカード。
 * og:image, og:titleが表示され、URLへのリンクを備えます
 */
export const LinkCard: FC<Props> = ({ linkUrl, metaInfo }) => {
  return (
    <Link
      className={styles.linkCard}
      href={linkUrl}
      rel="noreferrer"
      target="_blank"
    >
      <span className={styles.linkInner}>
        {metaInfo?.ogImage && (
          <Image
            className={styles.ogImage}
            src={metaInfo.ogImage}
            width="628"
            height="257"
            alt="entryData.ogInfo.title"
          />
        )}
        {metaInfo?.ogTitle && (
          <h4 className={styles.ogTitle}>{metaInfo.ogTitle}</h4>
        )}
        <p className={styles.linkUrl}>
          <span className={styles.linkText}>{linkUrl}</span>
        </p>
      </span>
    </Link>
  );
};

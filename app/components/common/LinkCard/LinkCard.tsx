import Image from "next/image";
import Link from "next/link";

import styles from "./LinkCard.module.css";

import type { FC } from "react";

type MetaInfo = {
  ogDescription: string | null;
  ogImage: string | null;
  ogTitle: string | null;
};

type Props = {
  linkUrl: string;
  metaInfo?: MetaInfo;
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
        {metaInfo?.ogImage != null && (
          <Image
            className={styles.ogImage}
            src={metaInfo.ogImage}
            width="628"
            height="257"
            alt="entryData.ogInfo.title"
          />
        )}
        {metaInfo?.ogTitle != null && (
          <h4 className={styles.ogTitle}>{metaInfo.ogTitle}</h4>
        )}
        <p className={styles.linkUrl}>
          <span className={styles.linkText}>{linkUrl}</span>
        </p>
      </span>
    </Link>
  );
};

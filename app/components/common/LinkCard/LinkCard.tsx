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
  thumbnail?: string;
  title?: string;
};

/**
 * リンクカード。
 * og:image, og:titleが表示され、URLへのリンクを備えます
 */
export const LinkCard: FC<Props> = ({ linkUrl, metaInfo, title, thumbnail }) => {
  const displayTitle = title ?? metaInfo?.ogTitle ?? linkUrl;
  const displayThumb = thumbnail ?? metaInfo?.ogImage ?? null;

  return (
    <Link
      className={styles.linkCard}
      href={linkUrl}
      rel="noreferrer"
      target="_blank"
    >
      <span className={styles.linkInner}>
        {displayThumb && (
          <span className={styles.thumbWrap}>
            <Image
              className={styles.ogImage}
              src={displayThumb}
              width={120}
              height={120}
              alt={displayTitle}
            />
          </span>
        )}
        <span className={styles.meta}>
          <h4 className={styles.ogTitle}>{displayTitle}</h4>
          <p className={styles.linkUrl}>
            <span className={styles.linkText}>{linkUrl}</span>
          </p>
        </span>
      </span>
    </Link>
  );
};

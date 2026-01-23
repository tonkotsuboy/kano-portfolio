import Image from "next/image";
import Link from "next/link";

import { GlassSurface } from "../GlassSurface";

import styles from "./LinkCard.module.css";

import type { FC } from "react";

interface MetaInfo {
  ogDescription: null | string;
  ogImage: null | string;
  ogTitle: null | string;
}

interface Props {
  linkUrl: string;
  metaInfo?: MetaInfo;
  thumbnail?: string;
  title?: string;
}

/**
 * リンクカード。
 * og:image, og:titleが表示され、URLへのリンクを備えます
 */
export const LinkCard: FC<Props> = ({ linkUrl, metaInfo, thumbnail, title }) => {
  const displayTitle: string = title ?? metaInfo?.ogTitle ?? linkUrl;
  const displayThumb: string | undefined = thumbnail ?? metaInfo?.ogImage ?? undefined;
  const isThumbAvailable = typeof displayThumb === "string" && displayThumb.length > 0;

  return (
    <Link
      className={styles.linkCard}
      href={linkUrl}
      rel="noreferrer"
      target="_blank"
    >
      <GlassSurface className={styles.linkInner}>
        {isThumbAvailable && displayThumb ? (
          <span className={styles.thumbWrap}>
            <Image
              className={styles.ogImage}
              src={displayThumb}
              width={120}
              height={120}
              alt={displayTitle}
            />
          </span>
        ) : null}
        <span className={styles.meta}>
          <h4 className={styles.ogTitle}>{displayTitle}</h4>
          <p className={styles.linkUrl}>
            <span className={styles.linkText}>{linkUrl}</span>
          </p>
        </span>
      </GlassSurface>
    </Link>
  );
};

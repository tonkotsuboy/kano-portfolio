import Image from "next/image";
import Link from "next/link";

import * as styles from "./LinkCard.css";

import type { EntryType } from "../../../types/EntryType";
import type { FC } from "react";

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

import type { FC } from "react";
import type { EntryType } from "../../../types/EntryType";
import Image from "next/image";
import {
  linkCard,
  linkInner,
  linkText,
  linkUrl as linkUrlStyle,
  ogImage,
  ogTitle,
} from "./LinkCard.css";
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
    <Link className={linkCard} href={linkUrl} rel="noreferrer" target="_blank">
      <span className={linkInner}>
        {metaInfo?.ogImage && (
          <Image
            className={ogImage}
            src={metaInfo.ogImage}
            width="628"
            height="257"
            alt="entryData.ogInfo.title"
          />
        )}
        {metaInfo?.ogTitle && <h4 className={ogTitle}>{metaInfo.ogTitle}</h4>}
        <p className={linkUrlStyle}>
          <span className={linkText}>{linkUrl}</span>
        </p>
      </span>
    </Link>
  );
};

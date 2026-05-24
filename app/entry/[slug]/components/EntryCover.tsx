"use client";

import Image from "next/image";
import { useState } from "react";

import styles from "../page.module.css";

import type { FC } from "react";

type Props = {
  alt: string;
  coverSrc: string;
}

export const EntryCover: FC<Props> = ({ alt, coverSrc }) => {
  // OG 画像が読めない（404 など）ときはヒーローごと隠す。下書き段階で割れ表示を出さないため。
  const [failed, setFailed] = useState(false);

  if (!coverSrc || failed) {
    return null;
  }

  return (
    <figure className={styles.cover}>
      <Image
        src={coverSrc}
        alt={alt}
        width={1200}
        height={630}
        sizes="(max-width: 768px) 100vw, 720px"
        className={styles.coverImage}
        priority
        unoptimized
        onError={() => setFailed(true)}
      />
    </figure>
  );
};

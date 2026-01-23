import Image from "next/image";

import styles from "../page.module.css";

import type { FC } from "react";

interface Props {
  alt: string;
  coverSrc: string;
}

export const EntryCover: FC<Props> = ({ alt, coverSrc }) => {
  if (!coverSrc) {return null;}

  return (
    <div className={styles.cover}>
      <Image
        src={coverSrc}
        alt={alt}
        width={1200}
        height={630}
        sizes="(max-width: 768px) 100vw, 960px"
        className={styles.coverImage}
        unoptimized={true}
      />
    </div>
  );
};

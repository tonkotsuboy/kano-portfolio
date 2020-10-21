import React from "react";
import Link from "next/link";
import classNames from "classnames";
import styles from "./MediumTagList.module.scss";
import { MediumType } from "../../../types/MediumType";
import { TagType } from "../../../types/TagType";

type Props = {
  mediumDataList: MediumType[];
  tagDataList: TagType[];
  isSelectedAbout?: boolean;
  /** 選択されている媒体 */
  selectedMedium?: string;
  /** 選択されているタグ */
  selectedTag?: string;
};

const MediumTagList: React.FC<Props> = ({
  mediumDataList,
  tagDataList,
  isSelectedAbout,
  selectedMedium,
  selectedTag,
}) => {
  return (
    <div>
      <ul className={styles.about}>
        <li>
          <Link href="/about">
            <a
              className={classNames(
                styles.slug,
                isSelectedAbout ? styles.slug__selected : null
              )}
            >
              自己紹介
            </a>
          </Link>
        </li>
      </ul>
      <ul className={styles.mediumList}>
        <li>
          <Link href="/">
            <a className={styles.slug}>すべての実績</a>
          </Link>
        </li>
        {mediumDataList.map(({ name, slug }) => (
          <li key={slug}>
            <Link href={`/medium/${slug}`}>
              <a
                className={classNames(
                  styles.slug,
                  selectedMedium === slug ? styles.slug__selected : null
                )}
              >
                {name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <h2 className={styles.tagheading}>タグ</h2>
      <ul className={styles.tagList}>
        {tagDataList.map(({ name, slug }) => (
          <li key={slug}>
            <Link href={`/tag/${slug}`}>
              <a
                className={classNames(
                  styles.slug,
                  selectedTag === slug ? styles.slug__selected : null
                )}
              >
                #{name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MediumTagList;

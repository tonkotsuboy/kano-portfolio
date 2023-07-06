import Link from "next/link";
import classNames from "classnames";
import { FC } from "react";
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

const MediumTagList: FC<Props> = ({
  mediumDataList,
  tagDataList,
  isSelectedAbout,
  selectedMedium,
  selectedTag,
}) => (
  <div>
    <ul className={styles.about}>
      <li>
        <Link
          href="/about"
          className={classNames(
            styles.slug,
            isSelectedAbout ? styles.slug__selected : null
          )}
        >
          自己紹介
        </Link>
      </li>
    </ul>
    <ul className={styles.mediumList}>
      <li>
        <Link href="/" className={styles.slug}>
          すべての実績
        </Link>
      </li>
      {mediumDataList.map(({ name, slug }) => (
        <li key={slug}>
          <Link
            href={`/medium/${slug}`}
            className={classNames(
              styles.slug,
              selectedMedium === slug ? styles.slug__selected : null
            )}
          >
            {name}
          </Link>
        </li>
      ))}
    </ul>
    <h2 className={styles.tagheading}>タグ</h2>
    <ul className={styles.tagList}>
      {tagDataList.map(({ name, slug }) => (
        <li key={slug}>
          <Link
            href={`/tag/${slug}`}
            className={classNames(
              styles.slug,
              selectedTag === slug ? styles.slug__selected : null
            )}
          >
            #{name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default MediumTagList;

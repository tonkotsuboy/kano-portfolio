import clsx from "clsx";
import Link from "next/link";

import * as navigationStyles from "./Navigation.css";
import * as styles from "./SideNavigation.css";

import type { MediumType } from "../../../types/MediumType";
import type { TagType } from "../../../types/TagType";
import type { FC, HTMLAttributes } from "react";

type Props = {
  mediumDataList: MediumType[];
  tagDataList: TagType[];
} & Pick<HTMLAttributes<HTMLElement>, "className">;

export const SideNavigation: FC<Props> = ({
  mediumDataList,
  tagDataList,
  className,
}) => {
  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.category}>
        <ul className={styles.categoryList}>
          <li>
            <Link href="/about" className={navigationStyles.slug}>
              自己紹介
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.category}>
        <h2 className={styles.categoryHeading}>カテゴリ</h2>
        <ul className={styles.categoryList}>
          <li>
            <Link href="/" className={navigationStyles.slug}>
              すべての実績
            </Link>
          </li>
          {mediumDataList.map(({ name, slug: slugData }) => (
            <li key={slugData}>
              <Link
                href={`/medium/${slugData}`}
                className={navigationStyles.slug}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.category}>
        <h2 className={styles.categoryHeading}>タグ</h2>
        <ul className={styles.categoryList}>
          {tagDataList.map(({ name, slug: slugData }) => (
            <li key={slugData}>
              <Link href={`/tag/${slugData}`} className={navigationStyles.slug}>
                #{name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

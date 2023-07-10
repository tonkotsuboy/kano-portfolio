import type { FC, HTMLAttributes } from "react";
import { category, categoryHeading, categoryList } from "./SideNavigation.css";

import Link from "next/link";
import type { MediumType } from "../../../types/MediumType";
import type { TagType } from "../../../types/TagType";
import { slug } from "./Navigation.css";

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
    <div className={className}>
      <div className={category}>
        <ul className={categoryList}>
          <li>
            <Link href="/about" className={slug}>
              自己紹介
            </Link>
          </li>
        </ul>
      </div>
      <div className={category}>
        <h2 className={categoryHeading}>カテゴリ</h2>
        <ul className={categoryList}>
          <li>
            <Link href="/" className={slug}>
              すべての実績
            </Link>
          </li>
          {mediumDataList.map(({ name, slug: slugData }) => (
            <li key={slugData}>
              <Link href={`/medium/${slugData}`} className={slug}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={category}>
        <h2 className={categoryHeading}>タグ</h2>
        <ul className={categoryList}>
          {tagDataList.map(({ name, slug: slugData }) => (
            <li key={slugData}>
              <Link href={`/tag/${slugData}`} className={slug}>
                #{name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

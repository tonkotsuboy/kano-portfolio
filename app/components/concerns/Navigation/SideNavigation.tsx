import type { FC } from "react";
import {
  category,
  categoryHeading,
  categoryList,
  slug,
} from "./Navigation.css";
import Link from "next/link";
import type { MediumType } from "../../../types/MediumType";
import type { TagType } from "../../../types/TagType";

type Props = {
  mediumDataList: MediumType[];
  tagDataList: TagType[];
};

export const SideNavigation: FC<Props> = ({ mediumDataList, tagDataList }) => (
  <div>
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

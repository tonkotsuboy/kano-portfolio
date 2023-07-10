import type { FC } from "react";
import type { MediumType } from "../../../types/MediumType";
import type { TagType } from "../../../types/TagType";
import {
  author,
  container,
  job,
  mediumList,
  slug,
  tagHeading,
  tagList,
} from "./Navigation.css";
import Link from "next/link";

type Props = {
  mediumDataList: MediumType[];
  tagDataList: TagType[];
};

/**
 * 画面サイズが大きいときに、画面左側に表示するナビゲーション用コンポーネント
 */
export const Navigation: FC<Props> = ({ mediumDataList, tagDataList }) => {
  return (
    <nav className={container}>
      <div>
        <Link href="/" className={author}>
          Takeshi Kano
        </Link>
        <p className={job}>Frontend Developer</p>
      </div>
      <ul>
        <li>
          <Link href="/about" className={slug}>
            自己紹介
          </Link>
        </li>
      </ul>
      <ul className={mediumList}>
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
      <div>
        <h2 className={tagHeading}>タグ</h2>
        <ul className={tagList}>
          {tagDataList.map(({ name, slug: slugData }) => (
            <li key={slugData}>
              <Link href={`/tag/${slugData}`} className={slug}>
                #{name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

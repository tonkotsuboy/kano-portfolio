import type { FC } from "react";
import type { MediumType } from "../../../types/MediumType";
import type { TagType } from "../../../types/TagType";
import {
  author,
  category,
  categoryHeading,
  categoryList,
  container,
  job,
  menuButton as menuButtonStyle,
  profile,
  slug,
} from "./Navigation.css";
import Link from "next/link";
import { MenuButton } from "../../common/MenuButton";

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
      <div className={profile}>
        <Link href="/" className={author}>
          Takeshi Kano
        </Link>
        <p className={job}>Frontend Developer</p>
      </div>
      <MenuButton className={menuButtonStyle} isClosed={false} />
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
    </nav>
  );
};

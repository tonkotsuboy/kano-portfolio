import type { FC } from "react";
import type { MediumType } from "../../../types/MediumType";
import type { TagType } from "../../../types/TagType";
import {
  author,
  category,
  categoryList,
  container,
  job,
  menuButton,
  profile,
  slug,
} from "./Navigation.css";
import Link from "next/link";
import { MenuButton } from "../../common/MenuButton";
import { SideNavigation } from "./SideNavigation";

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
      <MenuButton className={menuButton} isClosed={false} />
      <div className={profile}>
        <Link href="/" className={author}>
          Takeshi Kano
        </Link>
        <p className={job}>Frontend Developer</p>
      </div>
      <div className={category}>
        <ul className={categoryList}>
          <li>
            <Link href="/about" className={slug}>
              自己紹介
            </Link>
          </li>
        </ul>
      </div>
      <SideNavigation
        mediumDataList={mediumDataList}
        tagDataList={tagDataList}
      />
    </nav>
  );
};

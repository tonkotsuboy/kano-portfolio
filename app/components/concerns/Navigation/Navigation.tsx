import type { FC } from "react";
import type { MediumType } from "../../../types/MediumType";
import type { TagType } from "../../../types/TagType";
import {
  author,
  container,
  job,
  navInner,
  overlayNavigation,
  profile,
  sideNavigation,
} from "./Navigation.css";
import Link from "next/link";
import { SideNavigation } from "./SideNavigation";
import { OverLayMenu } from "./OverLayMenu";

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
      <div className={navInner}>
        <OverLayMenu
          mediumDataList={mediumDataList}
          tagDataList={tagDataList}
          className={overlayNavigation}
        />
        <div className={profile}>
          <Link href="/" className={author}>
            Takeshi Kano
          </Link>
          <p className={job}>Frontend Developer</p>
        </div>
        <SideNavigation
          className={sideNavigation}
          mediumDataList={mediumDataList}
          tagDataList={tagDataList}
        />
      </div>
    </nav>
  );
};

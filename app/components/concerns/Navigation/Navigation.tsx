import Link from "next/link";

import * as styles from "./Navigation.css";
import { OverLayMenu } from "./OverLayMenu";
import { SideNavigation } from "./SideNavigation";

import type { MediumType } from "../../../types/MediumType";
import type { TagType } from "../../../types/TagType";
import type { FC } from "react";

type Props = {
  mediumDataList: MediumType[];
  tagDataList: TagType[];
};

/**
 * 画面サイズが大きいときに、画面左側に表示するナビゲーション用コンポーネント
 */
export const Navigation: FC<Props> = ({ mediumDataList, tagDataList }) => {
  return (
    <nav className={styles.container}>
      <div className={styles.navInner}>
        <OverLayMenu
          mediumDataList={mediumDataList}
          tagDataList={tagDataList}
          className={styles.overlayNavigation}
        />
        <div className={styles.profile}>
          <Link href="/" className={styles.author}>
            Takeshi Kano
          </Link>
          <p className={styles.job}>Product Engineer</p>
        </div>
        <SideNavigation
          className={styles.sideNavigation}
          mediumDataList={mediumDataList}
          tagDataList={tagDataList}
        />
      </div>
    </nav>
  );
};

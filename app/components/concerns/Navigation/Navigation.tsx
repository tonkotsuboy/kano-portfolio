import type { FC } from "react";
import type { MediumType } from "../../../types/MediumType";
import type { TagType } from "../../../types/TagType";
import * as styles from "./Navigation.css";
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
          <p className={styles.job}>Frontend Developer</p>
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

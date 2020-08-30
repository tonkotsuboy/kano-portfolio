import React, { HTMLAttributes, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Author } from "../common/Author";
import { Job } from "../common/Job";
import { MenuButton } from "./MenuButton";

import styles from "./AppHeader.module.scss";
import { openNavigation } from "../../store";

type Props = Pick<HTMLAttributes<HTMLElement>, "className">;

/**
 * アプリケーションのヘッダー
 * @param className
 * @constructor
 */
const AppHeader: React.FC<Props> = ({ className }) => {
  const dispatch = useDispatch();

  // メニューボタンクリック時の処理
  const handleClick = useCallback(() => {
    dispatch(openNavigation());
  }, [dispatch]);

  return (
    <header className={[className, styles.appHeader].join(" ")}>
      <MenuButton className={styles.menuButton} onClick={handleClick} />
      <Author />
      <Job />
    </header>
  );
};

export default AppHeader;

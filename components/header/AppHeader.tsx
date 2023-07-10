import { HTMLAttributes, useCallback, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { Author } from "../common/Author";
import { Job } from "../common/Job";
import { MenuButton } from "./MenuButton";

import styles from "./AppHeader.module.scss";
import { closeNavigation, openNavigation, RootState } from "../../store";

type Props = Pick<HTMLAttributes<HTMLElement>, "className">;

/**
 * アプリケーションのヘッダー
 * @param className
 * @constructor
 */
const AppHeader: FC<Props> = ({ className }) => {
  const dispatch = useDispatch();

  const navigationIsOpened = useSelector<RootState>(
    (state) => state.navigationIsOpened
  );

  // メニューボタンクリック時の処理
  const handleClick = useCallback(() => {
    if (navigationIsOpened) {
      // メニュー以外のスクロールを禁止
      document.body.style.overflow = "visible";
      dispatch(closeNavigation());
      return;
    }

    // メニュー以外のスクロールを復活
    document.body.style.overflow = "hidden";

    dispatch(openNavigation());
  }, [navigationIsOpened, dispatch]);

  return (
    <header className={clsx(className, styles.appHeader)}>
      <MenuButton
        className={styles.menuButton}
        onClick={handleClick}
        isClosedStyle={navigationIsOpened === true}
      />
      <Author />
      <Job />
    </header>
  );
};

export default AppHeader;

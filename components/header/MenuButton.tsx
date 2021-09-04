import * as React from "react";
import { HTMLAttributes, VFC } from "react";
import classNames from "classnames";
import styles from "./MenuButton.module.scss";

type Props = {
  /** ボタンが閉じられている見た目にするかどうか？ 閉じられている場合はバツ印になる */
  isClosedStyle: boolean;
  onClick: () => void;
} & Pick<HTMLAttributes<HTMLElement>, "className">;

/**
 * 閉じるボタン用コンポーネント
 */
export const MenuButton: VFC<Props> = ({
  className,
  isClosedStyle,
  onClick,
}) => (
  <button
    type="button"
    className={classNames(
      className,
      styles.menuButton,
      isClosedStyle ? styles.menuButton__closed : null
    )}
    onClick={onClick}
  >
    <div className={classNames(styles.border, styles.border1)} />
    <div className={classNames(styles.border, styles.border2)} />
    <div className={classNames(styles.border, styles.border3)} />
  </button>
);

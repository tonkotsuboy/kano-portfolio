// eslint-disable-next-line import/no-named-as-default
import clsx from "clsx";

import styles from "./MenuButton.module.css";

import type { FC, HTMLAttributes } from "react";

type Props = {
  /** ボタンが閉じられている見た目にするかどうか？ 閉じられている場合はバツ印になる */
  isClosed: boolean;
  onClick?: () => void;
} & Pick<HTMLAttributes<HTMLElement>, "className">;

/**
 * 閉じるボタン用コンポーネント
 */
export const MenuButton: FC<Props> = ({ className, isClosed, onClick }) => (
  <button
    type="button"
    className={clsx(className, styles.menuButton)}
    onClick={onClick}
  >
    <span
      className={clsx(
        styles.border,
        styles.border1,
        isClosed && styles.border1Closed,
      )}
    />
    <span
      className={clsx(
        styles.border,
        styles.border2,
        isClosed && styles.border2Closed,
      )}
    />
    <span
      className={clsx(
        styles.border,
        styles.border3,
        isClosed && styles.border3Closed,
      )}
    />
  </button>
);

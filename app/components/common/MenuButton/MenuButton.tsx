import type { FC, HTMLAttributes } from "react";
import clsx from "clsx";
import {
  border,
  border1,
  border1Closed,
  border2,
  border2Closed,
  border3,
  border3Closed,
  menuButton,
} from "./MenuButton.css";

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
    className={clsx(className, menuButton)}
    onClick={onClick}
  >
    <div className={clsx(border, border1, isClosed && border1Closed)} />
    <div className={clsx(border, border2, isClosed && border2Closed)} />
    <div className={clsx(border, border3, isClosed && border3Closed)} />
  </button>
);

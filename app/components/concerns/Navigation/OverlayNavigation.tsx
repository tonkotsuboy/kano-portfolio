import clsx from "clsx";
import Link from "next/link";
import { forwardRef } from "react";

import { MenuButton } from "../../common/MenuButton";

import * as styles from "./OverlayNavigation.css";

import type { MediumType } from "../../../types/MediumType";
import type { TagType } from "../../../types/TagType";
import type { ForwardRefRenderFunction, HTMLAttributes, Ref } from "react";

type Props = {
  mediumDataList: MediumType[];
  onChangePage: () => void;
  onClickCloseButton: () => void;
  ref: Ref<HTMLDialogElement>;
  tagDataList: TagType[];
} & Pick<HTMLAttributes<HTMLElement>, "className">;

const _OverlayNavigation: ForwardRefRenderFunction<HTMLDialogElement, Props> = (
  { mediumDataList, tagDataList, onClickCloseButton, className, onChangePage },
  ref,
) => (
  <dialog ref={ref} className={clsx(styles.container, className)}>
    <MenuButton
      className={styles.menuButton}
      onClick={onClickCloseButton}
      isClosed={true}
    />
    <div className={styles.category}>
      <ul className={styles.categoryList}>
        <li>
          <Link href="/about" className={styles.slug} onClick={onChangePage}>
            自己紹介
          </Link>
        </li>
      </ul>
    </div>
    <div className={styles.category}>
      <h2 className={styles.categoryHeading}>カテゴリ</h2>
      <ul className={styles.categoryList}>
        <li>
          <Link href="/" className={styles.slug} onClick={onChangePage}>
            すべての実績
          </Link>
        </li>
        {mediumDataList.map(({ name, slug: slugData }) => (
          <li key={slugData}>
            <Link
              href={`/medium/${slugData}`}
              className={styles.slug}
              onClick={onChangePage}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
    <div className={styles.category}>
      <h2 className={styles.categoryHeading}>タグ</h2>
      <ul className={styles.categoryList}>
        {tagDataList.map(({ name, slug: slugData }) => (
          <li key={slugData}>
            <Link
              href={`/tag/${slugData}`}
              className={styles.slug}
              onClick={onChangePage}
            >
              #{name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </dialog>
);

export const OverlayNavigation = forwardRef<HTMLDialogElement, Props>(
  _OverlayNavigation,
);

import type { ForwardRefRenderFunction, HTMLAttributes, Ref } from "react";
import { forwardRef } from "react";
import {
  category,
  categoryHeading,
  categoryList,
  slug,
  container,
  menuButton,
} from "./OverlayNavigation.css";
import Link from "next/link";
import type { MediumType } from "../../../types/MediumType";
import type { TagType } from "../../../types/TagType";
import { MenuButton } from "../../common/MenuButton";
import clsx from "clsx";

type Props = {
  ref: Ref<HTMLDialogElement>;
  mediumDataList: MediumType[];
  tagDataList: TagType[];
  onClickCloseButton: () => void;
  onChangePage: () => void;
} & Pick<HTMLAttributes<HTMLElement>, "className">;

const _OverlayNavigation: ForwardRefRenderFunction<HTMLDialogElement, Props> = (
  { mediumDataList, tagDataList, onClickCloseButton, className, onChangePage },
  ref,
) => (
  <dialog ref={ref} className={clsx(container, className)}>
    <MenuButton
      className={menuButton}
      onClick={onClickCloseButton}
      isClosed={true}
    />
    <div className={category}>
      <h2 className={categoryHeading}>カテゴリ</h2>
      <ul className={categoryList}>
        <li>
          <Link href="/" className={slug} onClick={onChangePage}>
            すべての実績
          </Link>
        </li>
        {mediumDataList.map(({ name, slug: slugData }) => (
          <li key={slugData}>
            <Link
              href={`/medium/${slugData}`}
              className={slug}
              onClick={onChangePage}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
    <div className={category}>
      <h2 className={categoryHeading}>タグ</h2>
      <ul className={categoryList}>
        {tagDataList.map(({ name, slug: slugData }) => (
          <li key={slugData}>
            <Link
              href={`/tag/${slugData}`}
              className={slug}
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

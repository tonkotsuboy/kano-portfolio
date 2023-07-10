"use client";

import type { FC, HTMLAttributes } from "react";
import { useCallback, useRef } from "react";
import { MenuButton } from "../../common/MenuButton";
import { OverlayNavigation } from "./OverlayNavigation";
import type { MediumType } from "../../../types/MediumType";
import type { TagType } from "../../../types/TagType";

type Props = {
  mediumDataList: MediumType[];
  tagDataList: TagType[];
} & Pick<HTMLAttributes<HTMLElement>, "className">;

export const OverLayMenu: FC<Props> = ({
  className,
  mediumDataList,
  tagDataList,
}) => {
  const ref = useRef<HTMLDialogElement>(null);

  const showModal = useCallback(() => {
    if (ref.current) {
      ref.current.showModal();
    }
  }, []);

  const closeModal = useCallback(() => {
    if (ref.current) {
      ref.current.close();
    }
  }, []);

  return (
    <div className={className}>
      <MenuButton onClick={showModal} isClosed={ref.current?.open ?? false} />
      <OverlayNavigation
        ref={ref}
        mediumDataList={mediumDataList}
        tagDataList={tagDataList}
        onClickCloseButton={closeModal}
      />
    </div>
  );
};

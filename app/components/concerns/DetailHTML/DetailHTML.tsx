/* eslint-disable @typescript-eslint/no-unsafe-call, react/jsx-no-target-blank, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/restrict-template-expressions,@typescript-eslint/no-explicit-any */
import type { Document } from "@contentful/rich-text-types";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import type { FC } from "react";
import type { Options } from "@contentful/rich-text-react-renderer";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import styles from "./DetailHTML.module.scss";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { createHttpsImage } from "../../../utils";

const renderOptions: Options = {
  renderNode: {
    [INLINES.HYPERLINK]: ({ content, data }) => {
      const linkText = (content[0] as any).value as string;
      return <Link href={data["uri"]}>{linkText}</Link>;
    },
    [BLOCKS.EMBEDDED_ASSET]: ({
      data: {
        target: {
          fields: { file, title },
        },
      },
    }) => (
      <Image
        src={createHttpsImage(file.url as string)}
        width={file.details.image.width}
        height={file.details.image.height}
        alt={title}
      />
    ),
  },
};
/**
 * 記事詳細用HTML用コンポーネント
 * @param detailDocument
 */
export const DetailHTML: FC<{ detailDocument: Document }> = ({
  detailDocument,
}) => (
  <div className={styles["detailHTML"]}>
    {documentToReactComponents(detailDocument, renderOptions)}
  </div>
);

import {
  documentToHtmlString,
  Options,
} from "@contentful/rich-text-html-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

/**
 * 記事詳細用HTMLを作成します
 */
export const createDetailHTML = (detailDocument: Document): string => {
  const renderingHTMLOption: Partial<Options> = {
    renderNode: {
      [INLINES.HYPERLINK]: (node, next) => {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        return `<a href="${node.data.uri}"${
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
          node.data.uri.startsWith("https://mydomain.com")
            ? ""
            : ' target="_blank"'
        }>${next(node.content)}</a>`;
      },
      [BLOCKS.EMBEDDED_ASSET]: ({
        data: {
          target: { fields },
        },
      }) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions
        `<img src="${fields.file.url}" height="${fields.file.details.image.height}" width="${fields.file.details.image.width}" alt="${fields.description}"/>`,
    },
  };

  const detailHTML = documentToHtmlString(
    detailDocument as any,
    renderingHTMLOption
  );
  return detailHTML;
};

import { JSDOM } from "jsdom";

/**
 * HTMLからドキュメントを生成します。
 */
export const creteHTMLDocument = (htmlText: string): Document => {
  const jsdom = new JSDOM(htmlText);
  return jsdom.window.document;
};

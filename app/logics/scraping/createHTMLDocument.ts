import { JSDOM } from "jsdom";

/**
 * HTMLからドキュメントを生成します。
 */
export const createHTMLDocument = (htmlText: string): Document => {
  const jsdom = new JSDOM(htmlText);
  return jsdom.window.document;
};

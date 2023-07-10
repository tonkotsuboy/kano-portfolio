/**
 * 指定URLのHTMLコードを取得する
 * @param url
 */
export const fetchHTMLText = async (url: string): Promise<string> => {
  const htmlText = await (await fetch(url)).text();
  return htmlText;
};

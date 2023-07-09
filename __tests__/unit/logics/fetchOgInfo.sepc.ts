import request from "request";
import { creteHTMLDocument } from "../../../logics/scraping/creteHTMLDocument";
import { parseMetaInfo } from "../../../logics/scraping/parseMetaInfo";

describe("parseMetaInfo", () => {
  test("meta情報回りの正常取得", async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const htmlText = await new Promise<any>((resolve) => {
      request.get("https://www.kyushu-u.ac.jp/ja/", (_err, _response, body) => {
        resolve(body);
      });
    });

    const htmlDocument = creteHTMLDocument(htmlText as string);

    const { ogImage, ogTitle, ogDescription } =
      parseMetaInfo(htmlDocument) ?? {};
    expect(ogTitle?.includes("九州大学")).toBeTruthy();
    expect(ogImage?.includes(".png")).toBeTruthy();
    expect(ogDescription?.includes("九州大学")).toBeTruthy();
  });
});

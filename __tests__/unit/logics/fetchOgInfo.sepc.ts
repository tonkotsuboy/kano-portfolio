import request from "request";
import { creteHTMLDocument } from "../../../logics/scraping/creteHTMLDocument";
import { parseMetaInfo } from "../../../logics/scraping/parseMetaInfo";

describe("parseMetaInfo", () => {
  test("meta情報回りの正常取得", async (done) => {
    const htmlText = await new Promise<string>((resolve) => {
      request.get("https://www.kyushu-u.ac.jp/ja/", (_err, _response, body) => {
        resolve(body);
      });
    });

    const htmlDocument = creteHTMLDocument(htmlText);
    const { ogImage, ogTitle, ogDescription } = parseMetaInfo(htmlDocument)!;
    expect(ogTitle?.includes("九州大学")).toBeTruthy();
    expect(ogImage?.includes(".png")).toBeTruthy();
    expect(ogDescription?.includes("九州大学")).toBeTruthy();
    done();
  });
});

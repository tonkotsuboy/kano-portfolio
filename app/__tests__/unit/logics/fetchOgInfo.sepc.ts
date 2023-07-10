import { creteHTMLDocument } from "../../../logics/scraping/creteHTMLDocument";
import { parseMetaInfo } from "../../../logics/scraping/parseMetaInfo";

const sampleHTML = `
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>とんこつ大学</title>
    <meta name="Keywords" content="とんこつ大学">
    <meta name="Description" content="とんこつ大学の公式ウェブサイトです">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta property="og:title" content="とんこつ大学">
    <meta property="og:url" content="https://example.com/ja/">
    <meta property="og:description" content="とんこつ大学の公式ウェブサイトです">
    <meta property="og:image" content="https://example.com/thumb.png">
    <meta property="og:site_name" content="とんこつ大学">
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="ja_JP" />
    </script>
</head>
<body>
</body>>
</html>
`;

describe("parseMetaInfo", () => {
  test("meta情報回りの正常取得", async () => {
    const htmlDocument = creteHTMLDocument(sampleHTML);
    const { ogImage, ogTitle, ogDescription } =
      parseMetaInfo(htmlDocument) ?? {};
    expect(ogTitle?.includes("とんこつ大学")).toBe(true);
    expect(ogImage?.includes("https://example.com/thumb.png")).toBe(true);
    expect(ogDescription?.includes("とんこつ大学")).toBe(true);
  });
});

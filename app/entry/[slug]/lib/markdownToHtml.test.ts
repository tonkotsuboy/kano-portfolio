import { describe, expect, test } from "vitest";

import { transformLinkCards } from "./linkCard";
import {
  markdownToHtml,
  parseCodeInfo,
  transformSizedImages,
  wrapStandaloneImages,
} from "./markdownToHtml";

describe("parseCodeInfo", () => {
  test("言語のみの info から言語名を取り出す", () => {
    expect(parseCodeInfo("ts")).toEqual({ lang: "ts", title: "" });
  });

  test('title="..." からファイル名を取り出す', () => {
    expect(parseCodeInfo('css title="card.css"')).toEqual({ lang: "css", title: "card.css" });
  });

  test("空文字のときは text にフォールバックする", () => {
    expect(parseCodeInfo("")).toEqual({ lang: "text", title: "" });
  });
});

describe("transformSizedImages", () => {
  test("=WxH 記法（幅のみ）を style 付き img へ変換する", () => {
    const out = transformSizedImages("![代替](/a.png =300x)");
    expect(out).toContain('<img src="/a.png" alt="代替"');
    expect(out).toContain('style="width: 300px"');
    expect(out).not.toContain("height:");
  });

  test("幅と高さの両方を指定できる", () => {
    const out = transformSizedImages("![代替](/a.png =300x200)");
    expect(out).toContain("width: 300px");
    expect(out).toContain("height: 200px");
  });

  test("title を保持する（figcaption 用）", () => {
    const out = transformSizedImages('![代替](/a.png =300x "コードファイル")');
    expect(out).toContain('title="コードファイル"');
    expect(out).toContain('style="width: 300px"');
  });

  test("サイズ記法のない画像はそのまま（marked に委ねる）", () => {
    expect(transformSizedImages("![a](/a.png)")).toBe("![a](/a.png)");
    expect(transformSizedImages('![a](/a.png "t")')).toBe('![a](/a.png "t")');
  });

  test("属性値の特殊文字をエスケープする", () => {
    const out = transformSizedImages('![a&b](/a.png =100x "x<y>")');
    expect(out).toContain("a&amp;b");
    expect(out).toContain("x&lt;y&gt;");
  });
});

// ネットワークを叩かないよう OG 取得は常にスタブを注入する。
const noOg = (): Promise<null | string> => Promise.resolve(null);

describe("transformLinkCards", () => {
  test("段落だけの外部リンクをリンクカードへ変換する（OG画像なし）", async () => {
    const output = await transformLinkCards('<p><a href="https://example.com/path">タイトル</a></p>', noOg);
    expect(output).toContain("data-linkcard");
    expect(output).toContain('href="https://example.com/path"');
    expect(output).toContain("タイトル");
    expect(output).toContain("example.com");
    expect(output).not.toContain("<p>");
  });

  test("OG画像を取得できたらサムネ img を差し込む", async () => {
    const output = await transformLinkCards(
      '<p><a href="https://example.com">t</a></p>',
      () => Promise.resolve("https://img.example.com/og.png"),
    );
    expect(output).toContain('<img src="https://img.example.com/og.png"');
    expect(output).toContain("data-has-image");
  });

  test("OG画像を取得できないブランド（Amazon）はアイコンへフォールバックする", async () => {
    const output = await transformLinkCards(
      '<p><a href="https://www.amazon.co.jp/dp/4297156288">本</a></p>',
      noOg,
    );
    expect(output).toContain("data-brand");
    expect(output).toContain("<svg");
  });

  test("ブランド未登録ホストは OG 画像なしでホスト名の頭文字を出す", async () => {
    const output = await transformLinkCards('<p><a href="https://example.com">t</a></p>', noOg);
    expect(output).toContain(">E</span>");
    expect(output).not.toContain("data-brand");
  });

  test("http(s) 以外のスキームは変換しない", async () => {
    const input = '<p><a href="mailto:a@example.com">mail</a></p>';
    expect(await transformLinkCards(input, noOg)).toBe(input);
  });

  test("段落内に本文があるリンクは変換しない", async () => {
    const input = '<p>前置き <a href="https://example.com">link</a> 後ろ</p>';
    expect(await transformLinkCards(input, noOg)).toBe(input);
  });
});

describe("wrapStandaloneImages", () => {
  test("段落だけの画像を figure でラップする", () => {
    const output = wrapStandaloneImages('<p><img src="/a.png" alt="A"></p>');
    expect(output).toContain("data-figure");
    expect(output).toContain('src="/a.png"');
  });

  test("単独ブロックの画像も figure でラップする", () => {
    const output = wrapStandaloneImages('text\n<img src="/b.png" alt="B" width="280" />\nmore');
    expect(output).toContain("<figure data-figure>");
    expect(output).toContain('src="/b.png"');
  });

  test("title 属性があるときキャプションを付ける", () => {
    const output = wrapStandaloneImages('<p><img src="/c.png" alt="C" title="図1"></p>');
    expect(output).toContain("<figcaption>図1</figcaption>");
  });

  test("本文画像は遅延読み込み属性を付ける（below-the-fold）", () => {
    const output = wrapStandaloneImages('<p><img src="/a.png" alt="A"></p>');
    expect(output).toContain('loading="lazy"');
    expect(output).toContain('decoding="async"');
  });

  test("拡大用の dialog やトリガーボタンは生成しない（クリック拡大なし）", () => {
    const output = wrapStandaloneImages('<p><img src="/a.png" alt="A"></p>');
    expect(output).not.toContain("<dialog");
    expect(output).not.toContain("command=");
    expect(output).not.toContain("data-lightbox");
  });
});

describe("markdownToHtml", () => {
  test("見出しと本文を HTML にする", async () => {
    const html = await markdownToHtml("## 見出し\n\n本文です。");
    expect(html).toContain("<h2");
    expect(html).toContain("見出し");
    expect(html).toContain("本文です。");
  });

  test("コードブロックを Shiki でハイライトしてバーを付ける", async () => {
    const html = await markdownToHtml('```ts title="a.ts"\nconst x = 1;\n```');
    expect(html).toContain("data-code");
    expect(html).toContain("data-code-lang");
    expect(html).toContain("a.ts");
    expect(html).toContain('class="shiki');
    expect(html).toContain("data-code-copy");
  });

  test("zenn 式サイズ記法を width 付きの figure 画像に変換する", async () => {
    const html = await markdownToHtml('![コード](/x.png =300x "コード")');
    expect(html).toContain("data-figure");
    expect(html).toContain("width: 300px");
    expect(html).toContain("<figcaption>コード</figcaption>");
    expect(html).toContain('loading="lazy"');
  });

  test("空文字は空文字を返す", async () => {
    expect(await markdownToHtml("   ")).toBe("");
  });
});

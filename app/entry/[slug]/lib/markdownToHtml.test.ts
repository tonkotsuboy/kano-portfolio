import { describe, expect, test } from "vitest";

import { transformLinkCards } from "./linkCard";
import { markdownToHtml, parseCodeInfo, wrapStandaloneImages } from "./markdownToHtml";

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

describe("transformLinkCards", () => {
  test("段落だけの外部リンクをリンクカードへ変換する", () => {
    const output = transformLinkCards('<p><a href="https://example.com/path">タイトル</a></p>');
    expect(output).toContain("data-linkcard");
    expect(output).toContain('href="https://example.com/path"');
    expect(output).toContain("タイトル");
    expect(output).toContain("example.com");
    expect(output).not.toContain("<p>");
  });

  test("http(s) 以外のスキームは変換しない", () => {
    const input = '<p><a href="mailto:a@example.com">mail</a></p>';
    expect(transformLinkCards(input)).toBe(input);
  });

  test("段落内に本文があるリンクは変換しない", () => {
    const input = '<p>前置き <a href="https://example.com">link</a> 後ろ</p>';
    expect(transformLinkCards(input)).toBe(input);
  });
});

describe("wrapStandaloneImages", () => {
  test("段落だけの画像を figure でラップする", () => {
    const output = wrapStandaloneImages('<p><img src="/a.png" alt="A"></p>');
    expect(output).toContain("data-figure");
    expect(output).toContain("data-lightbox");
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

  test("空文字は空文字を返す", async () => {
    expect(await markdownToHtml("   ")).toBe("");
  });
});

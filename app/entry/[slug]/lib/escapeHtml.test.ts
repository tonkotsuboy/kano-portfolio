import { describe, expect, test } from "vitest";

import { escapeHtml } from "./escapeHtml";

describe("escapeHtml", () => {
  test("通常の文字列はそのまま返す", () => {
    expect(escapeHtml("hello world")).toBe("hello world");
  });

  test("& をエスケープする", () => {
    expect(escapeHtml("foo & bar")).toBe("foo &amp; bar");
  });

  test("< と > をエスケープする", () => {
    expect(escapeHtml("<script>alert(1)</script>")).toBe(
      "&lt;script&gt;alert(1)&lt;/script&gt;",
    );
  });

  test('" をエスケープする', () => {
    expect(escapeHtml('href="evil"')).toBe("href=&quot;evil&quot;");
  });

  test("' をエスケープする", () => {
    expect(escapeHtml("it's")).toBe("it&#039;s");
  });

  test("複数の特殊文字が混在する場合もすべてエスケープする", () => {
    expect(escapeHtml('<a href="url" onclick=\'evil()\'>click & go</a>')).toBe(
      "&lt;a href=&quot;url&quot; onclick=&#039;evil()&#039;&gt;click &amp; go&lt;/a&gt;",
    );
  });
});

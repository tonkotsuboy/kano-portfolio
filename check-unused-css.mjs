#!/usr/bin/env node
import { PurgeCSS } from "purgecss";

const results = await new PurgeCSS().purge({
  content: ["app/**/*.{tsx,ts}", "content/**/*.md"],
  css: ["app/**/*.css"],
  defaultExtractor: (content) =>
    content.match(/[A-Za-z_][A-Za-z0-9_-]*/g) ?? [],
  rejected: true,
  safelist: {
    standard: [
      /^:/,
      /^::/,
      "html",
      "body",
      "main",
      "button",
      "*",
    ],
    greedy: [
      /data-/,
      // 記事本文（.body）は Markdown を HTML 文字列として注入するため、<strong> / <ol> /
      // <table> 等のタグは .md の生テキストに現れず PurgeCSS が抽出できない。Markdown / GFM が
      // 生成する要素を対象にした子孫セレクタ（.body strong 等）は未使用判定から除外する。
      // コンビネータ直後 + 語境界に限定し、.area や .theme 等のクラス名内の偶然一致は拾わない。
      /(?:^|[\s>+~])(?:figcaption|figure|blockquote|strong|thead|tbody|footer|table|code|pre|del|sup|sub|img|h[1-6]|em|hr|ul|ol|li|tr|th|td|a|p)(?=$|[\s>+~:.\[])/,
    ],
  },
});

const hasClassSelector = (s) => /\.[A-Za-z_][A-Za-z0-9_-]*/.test(s);

let total = 0;
for (const r of results) {
  const classRejects = (r.rejected ?? []).filter(hasClassSelector);
  if (classRejects.length > 0) {
    console.log(`\n${r.file}`);
    classRejects.forEach((s) => console.log(`  ${s}`));
    total += classRejects.length;
  }
}

if (total > 0) {
  console.error(`\n${total} unused class selector(s) found.`);
  process.exit(1);
} else {
  console.log("No unused class selectors.");
}

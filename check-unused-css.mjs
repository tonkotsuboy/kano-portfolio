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
    greedy: [/data-/],
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

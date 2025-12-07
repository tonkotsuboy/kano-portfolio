#!/usr/bin/env node
// Fetch OG images from external articles (Zenn / Qiita etc.) and update markdown thumbnails.
// Usage: node scripts/fetch-thumbnails-from-externals.mjs [--force]
// - Downloads og:image for posts whose linkUrl/targetUrl points to supported domains.
// - Saves to public/images/og/<slug>.<ext> and updates content/posts/<slug>.md thumbnail frontmatter.
// Supports: zenn.dev, qiita.com (extend HOST_WHITELIST as needed).

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, "..");
const POSTS_JSON = path.join(projectRoot, ".velite/posts.json");
const POSTS_DIR = path.join(projectRoot, "content/posts");
const OG_DIR = path.join(projectRoot, "public/images/og");

const HOST_WHITELIST = new Set(["zenn.dev", "qiita.com"]);
const FORCE = process.argv.includes("--force");
const UA = "Mozilla/5.0 (compatible; kano-portfolio-og-fetcher/1.0)";

fs.mkdirSync(OG_DIR, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const loadPosts = () => {
  if (fs.existsSync(POSTS_JSON)) {
    return JSON.parse(fs.readFileSync(POSTS_JSON, "utf8"));
  }
  // fallback: minimal md parse
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, f), "utf8");
      const slug = raw.match(/^slug: "([^"]+)"/m)?.[1];
      const linkUrl = raw.match(/^linkUrl: "([^"]*)"/m)?.[1] || "";
      const targetUrl = raw.match(/^targetUrl: "([^"]*)"/m)?.[1] || "";
      return { slug, linkUrl, targetUrl, hasDetail: false };
    })
    .filter((p) => p.slug);
};

const extractOg = (html) => {
  const patterns = [
    /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i,
    /<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["'][^>]*>/i,
    /<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["'][^>]*>/i,
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m?.[1]) return m[1];
  }
  return null;
};

const fetchHTML = async (url) => {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.text();
};

const download = async (url, dest) => {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`download ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
};

const updateFrontmatter = (slug, ogPath) => {
  const mdPath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(mdPath)) return false;
  let md = fs.readFileSync(mdPath, "utf8");
  const line = `thumbnail: "${ogPath}"`;
  if (/^thumbnail: ".*"$/m.test(md)) {
    md = md.replace(/^thumbnail: ".*"$/m, line);
  } else {
    md = md.replace(/^(slug: ".+"$)/m, `$1\n${line}`);
  }
  fs.writeFileSync(mdPath, md, "utf8");
  return true;
};

const shouldProcess = (url) => {
  if (!url) return false;
  try {
    const u = new URL(url.startsWith("http") ? url : `https://kano.codes${url}`);
    return HOST_WHITELIST.has(u.hostname);
  } catch (_) {
    return false;
  }
};

(async () => {
  const posts = loadPosts();
  const targets = posts.filter((p) => shouldProcess(p.linkUrl) || shouldProcess(p.targetUrl));
  let done = 0,
    skip = 0,
    fail = 0;
  for (const post of targets) {
    const url = shouldProcess(post.linkUrl)
      ? post.linkUrl
      : shouldProcess(post.targetUrl)
        ? post.targetUrl.startsWith("http")
          ? post.targetUrl
          : `https://kano.codes${post.targetUrl}`
        : null;
    if (!url) {
      skip++;
      continue;
    }

    const mdPath = path.join(POSTS_DIR, `${post.slug}.md`);
    if (!fs.existsSync(mdPath)) {
      skip++;
      continue;
    }

    const existing = fs.readFileSync(mdPath, "utf8").match(/^thumbnail: "([^"]+)"/m)?.[1];
    if (!FORCE && existing && existing.startsWith("/images/og/") && fs.existsSync(path.join(OG_DIR, path.basename(existing)))) {
      skip++;
      continue;
    }

    try {
      const html = await fetchHTML(url);
      const og = extractOg(html);
      if (!og) throw new Error("no og:image");
      const ext = (og.match(/\.([a-zA-Z0-9]+)(\?.*)?$/) || [])[1] || "png";
      const dest = path.join(OG_DIR, `${post.slug}.${ext}`);
      await download(og, dest);
      updateFrontmatter(post.slug, `/images/og/${post.slug}.${ext}`);
      done++;
      console.log(`✓ ${post.slug} -> ${og}`);
    } catch (e) {
      fail++;
      console.log(`✗ ${post.slug}: ${e.message}`);
    }
    await sleep(300);
  }
  console.log({ done, skip, fail });
})();

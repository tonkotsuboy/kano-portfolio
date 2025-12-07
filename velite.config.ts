import { defineConfig, s } from "velite";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: false, // Avoid rmdir conflicts during Next dev (watcher keeps the dir in use)
  },
  collections: {
    posts: {
      name: "Post",
      pattern: "posts/**/*.md",
      schema: s
        .object({
          slug: s.string(),
          title: s.string().max(200),
          date: s.isodate(),
          published: s.boolean().default(true),
          tags: s.array(s.string()).default([]),
          categories: s.array(s.string()).default([]),
          medium: s.string().default(""),
          thumbnail: s.string().default(""),
          slides: s.string().optional(),
          linkUrl: s.string().optional(),
          targetUrl: s.string().optional(),
          hasDetail: s.boolean().default(false),
          body: s.markdown().optional(),
        })
        .transform((data) => ({
          ...data,
          permalink: data.targetUrl || `/entry/${data.slug}`,
        })),
    },
  },
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          keepBackground: false,
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
        },
      ],
    ],
  },
});

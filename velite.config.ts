import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { defineConfig, s } from "velite";

export default defineConfig({
  collections: {
    posts: {
      name: "Post",
      pattern: "posts/**/*.md",
      schema: s
        .object({
          body: s.markdown().optional(),
          categories: s.array(s.string()).default([]),
          date: s.isodate(),
          hasDetail: s.boolean().default(false),
          linkUrl: s.string().optional(),
          medium: s.string().default(""),
          published: s.boolean().default(true),
          slides: s.string().optional(),
          slug: s.string(),
          tags: s.array(s.string()).default([]),
          targetUrl: s.string().optional(),
          thumbnail: s.string().default(""),
          title: s.string().max(200),
        })
        .transform((data) => ({
          ...data,
          permalink: data.targetUrl ?? `/entry/${data.slug}`,
        })),
    },
  },
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          keepBackground: false,
          theme: "github-dark",
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
  output: {
    assets: "public/static",
    base: "/static/",
    clean: false, // Avoid rmdir conflicts during Next dev (watcher keeps the dir in use)
    data: ".velite",
    name: "[name]-[hash:6].[ext]",
  },
  root: "content",
});

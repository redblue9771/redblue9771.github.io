import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeKatex from "rehype-katex"
import rehypePrismPlus from "rehype-prism-plus"
import rehypeSlug from "rehype-slug"
import remarkMath from "remark-math"
import { unified } from "@astrojs/markdown-remark"
import { defineConfig } from "astro/config"

export default defineConfig({
  site: "https://redblue.fun",
  trailingSlash: "never",
  publicDir: "./static",
  integrations: [react(), sitemap()],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [
        rehypeKatex,
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
        [rehypePrismPlus, { ignoreMissing: true }],
      ],
      gfm: true,
      smartypants: true,
    }),
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        usePolling: true,
        interval: 1000,
      },
    },
  },
})

import rss from "@astrojs/rss"
import type { APIRoute } from "astro"
import { getCollection } from "astro:content"
import { articleExcerpt, sortArticles } from "../lib/articles"

export const GET: APIRoute = async ({ site }) => {
  if (!site)
    throw new Error("Set the site URL in astro.config.ts to generate RSS.")

  const articles = sortArticles(
    await getCollection("articles", ({ data }) => !data.draft),
  )
  return rss({
    title: "RedBlue's RSS Feed",
    description: "RedBlue（赤琦）的博文",
    site,
    items: articles.map(article => ({
      title: article.data.title,
      description: articleExcerpt(article, 300),
      link: `/articles/${article.id}`,
      ...(article.data.date ? { pubDate: article.data.date } : {}),
      author: article.data.author ?? undefined,
      categories: article.data.tags,
    })),
  })
}

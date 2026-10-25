import rss from "@astrojs/rss"
import type { APIRoute } from "astro"
import { getCollection } from "astro:content"
import { siteConfig } from "../../config/site"
import { articleExcerpt, sortArticles } from "../articles"

export const GET: APIRoute = async ({ site }) => {
  if (!site)
    throw new Error("Set the site URL in astro.config.ts to generate RSS.")

  const articles = sortArticles(
    await getCollection("articles", ({ data }) => !data.draft),
  )
  return rss({
    title: `${siteConfig.site.name} RSS Feed`,
    description: `${siteConfig.brand.name}的博文`,
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

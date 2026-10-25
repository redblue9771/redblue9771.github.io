import type { CollectionEntry } from "astro:content"

export type ArticleEntry = CollectionEntry<"articles">

export const sortArticles = (articles: ArticleEntry[]) =>
  [...articles].sort(
    (left, right) =>
      (right.data.date?.getTime() ?? 0) - (left.data.date?.getTime() ?? 0),
  )

export const articleExcerpt = (article: ArticleEntry, maxLength = 180) => {
  const text = (article.data.description ?? article.body ?? "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~|]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
  return text.length > maxLength ? `${text.slice(0, maxLength)}…` : text
}

export const formatArticleDate = (date?: Date) =>
  date ? date.toISOString().slice(0, 10) : "日期未注明"

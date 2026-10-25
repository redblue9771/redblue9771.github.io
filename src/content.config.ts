import { defineCollection } from "astro:content"
import { file, glob } from "astro/loaders"
import { z } from "astro/zod"
import { parse } from "yaml"

const parseYamlList = (text: string) => {
  const parsed: unknown = parse(text)
  if (!Array.isArray(parsed)) {
    throw new Error("Expected a YAML file containing a list of records.")
  }

  return parsed.map((record: unknown, index: number) => {
    if (
      record === null ||
      typeof record !== "object" ||
      Array.isArray(record)
    ) {
      throw new Error(`Invalid YAML record at index ${index}.`)
    }
    return { ...record, id: String(index) }
  })
}

const articles = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./content/articles",
    generateId: ({ entry }) => entry.replace(/\.md$/i, "").toLowerCase(),
  }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional(),
    author: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    draft: z.boolean().optional(),
    original: z.string().nullable().optional(),
    series: z.array(z.string()).nullable().optional(),
    tags: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
    slug: z.string().optional(),
  }),
})

const pages = defineCollection({
  loader: file("./content/data/publicPage.yaml", {
    parser: parseYamlList,
  }),
  schema: z.object({
    title: z.string().nullable().optional(),
    subTitle: z.string().nullable().optional(),
    siteTitle: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    _hidden: z.boolean().optional(),
    route: z.object({
      title: z.object({ cn: z.string().nullable().optional() }),
      path: z.string(),
      _external: z.boolean().optional(),
    }),
  }),
})

const carousel = defineCollection({
  loader: file("./content/data/carousel.yaml", { parser: parseYamlList }),
  schema: z.object({
    title: z.string(),
    link: z.string().optional(),
    cover: z.string(),
    description: z.string().optional(),
    for: z.string().optional(),
  }),
})

const books = defineCollection({
  loader: file("./content/data/book.yaml", { parser: parseYamlList }),
  schema: z.object({
    name: z.string(),
    author: z.string().nullable().optional(),
    slug: z.string(),
    download: z.string().optional(),
    description: z.string().nullable().optional(),
    keywords: z.array(z.string()).optional(),
    series: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
  }),
})

export const collections = { articles, pages, carousel, books }

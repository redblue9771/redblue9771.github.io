import { TimeLine } from "@/components"
import { ArticleCategoryNav } from "@/features/sections"
import { useSearchParams } from "@/utils/hooks"
import { useLocation } from "@reach/router"
import { Link, PageProps } from "gatsby"
import React from "react"
import { Container } from "react-bootstrap"
import {
  MarkdownRemarkGroupConnection,
  SitePageGroupConnection,
} from "typings/graphql-types"
import { SiteMetadata } from "./main.layout"

export interface ISearchParams {
  group?: IArticleGroupByKeys
  current?: string
  page?: string
  search?: string
}

type IArticleGroupByKeys = keyof IArticleGroupBy

interface IArticleGroupBy {
  categories: MarkdownRemarkGroupConnection[]
  tags: MarkdownRemarkGroupConnection[]
  series: MarkdownRemarkGroupConnection[]
}

interface IArticles {
  list: SitePageGroupConnection
  groupBy: IArticleGroupBy
}

export interface IArticleGroupProps {
  articles: IArticles
}

function Articles({ pageContext }: PageProps<null, IArticleGroupProps>) {
  const { articles } = pageContext
  const { setMetadata } = React.useContext(SiteMetadata)
  React.useEffect(() => {
    setMetadata(prev => ({
      ...prev,
      title: "博文",
      subTitle: "我非生而知之者",
      description: "学而时习之",
      date: "",
    }))
  }, [])

  const location = useLocation()
  const search = useSearchParams<ISearchParams>(location.search)

  const articleList = React.useMemo(() => {
    const current =
      search.group &&
      articles.groupBy?.[search.group]?.find(
        item => item.fieldValue === search.current
      )
    if (current) {
      return current.nodes
    }
    return articles.list?.edges?.map(item => item.node)
  }, [articles, search])

  return (
    <Container fluid="lg" className="text-dark">
      <ArticleCategoryNav articles={articles} />
      <TimeLine.Container>
        {articleList?.map((node: any) => (
          <TimeLine.Item
            date={`${node.frontmatter.author} - ${
              node.frontmatter.date || new Date().toLocaleDateString()
            }`}
            title={node.frontmatter.title || node.frontmatter.slug}
            description={node.frontmatter.description || node.excerpt}
            to={node.frontmatter.slug || node.fields.slug}
            key={node.id}
            component={Link}
          />
        ))}
      </TimeLine.Container>
    </Container>
  )
}

export default Articles

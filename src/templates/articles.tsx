import { SEO, TimeLine } from "@/components"
import { useHeaderMetadataContext } from "@/features/layouts"
import { ArticleCategoryNav } from "@/features/sections"
import { useSearchParams } from "@/hooks"
import { useLocation } from "@reach/router"
import { graphql, PageProps } from "gatsby"
import { useEffect, useMemo } from "react"

import { Container } from "react-bootstrap"
export const Head = () => <SEO title="博文" />
export const query = graphql`
  query Article($_pathname: String) {
    publicPage(route: { path: { eq: $_pathname } }) {
      title
      subTitle
      description
    }
  }
`
export type IRouteSearchParams = {
  group?: IArticleGroupKeys
  current?: string
  page?: string
  search?: string
}

type IArticleGroup = {
  categories: Queries.MarkdownRemarkGroupConnection[]
  tags: Queries.MarkdownRemarkGroupConnection[]
  series: Queries.MarkdownRemarkGroupConnection[]
}

type IArticleGroupKeys = keyof IArticleGroup

type IArticles = {
  list: Queries.SitePageGroupConnection
  groupBy: IArticleGroup
}

export type IArticleGroupProps = {
  articles: IArticles
}

function Articles({
  pageContext,
  data: { publicPage },
}: PageProps<null, IArticleGroupProps>) {
  const { articles } = pageContext

  const location = useLocation()
  const search = useSearchParams<IRouteSearchParams>(location.search)

  const articleList = useMemo(() => {
    const current =
      search.group &&
      articles.groupBy?.[search.group]?.find(
        item => item.fieldValue === search.current,
      )
    if (current) {
      return current.nodes
    }
    return articles.list?.edges?.map(item => item.node)
  }, [articles, search])
  const { setHeaderMetadata } = useHeaderMetadataContext()

  console.log({ pageContext })
  useEffect(() => {
    setHeaderMetadata(publicPage)
  })

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
            href={node.frontmatter.slug || node.fields.slug}
            key={node.id}
            component="a"
            target="_blank"
          />
        ))}
      </TimeLine.Container>
    </Container>
  )
}

export default Articles

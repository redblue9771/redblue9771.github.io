import { TimeLine } from "@/components"
import { MainLayout } from "@/features/layouts"
import { ArticleCategoryNav } from "@/features/sections"
import { useSearchParams } from "@/utils/hooks"
import { Link, PageProps } from "gatsby"
import React from "react"
import { Container } from "react-bootstrap"
import { LinkGetProps, useLocation } from "@reach/router"

export interface ISearchParams {
  group?: string
  current?: string
  page?: string
  search?: string
}

interface IGroupItem {
  fieldValue: string
}

interface IGroupList {
  [propsName: string]: IGroupItem[]
}

export interface IArticleGroupProps {
  groupList: IGroupList
}

function Articles({ pageContext }: PageProps<null, IArticleGroupProps>) {
  const location = useLocation()
  const search = useSearchParams<ISearchParams>(location.search)
  console.log(search)

  const { groupList, groupBy } = pageContext

  const articleList: IGroupList[] = React.useMemo(() => {
    if (
      !(search.current && search.current !== "none" && search.current !== "")
    ) {
      return groupBy.articles.nodes
    }
    switch (search.group) {
      case "categories":
        return groupBy.articlesByCategory[search.current].nodes
      case "tags":
        return groupBy.articlesByTag[search.current].nodes

      case "series":
        return groupBy.articlesBySeries[search.current].nodes

      default:
        return groupBy.articles.nodes
    }
  }, [groupBy, search])
  console.log(articleList)
  return (
    <MainLayout>
      <Container fluid="lg" className="text-dark">
        <ArticleCategoryNav groupList={groupList} />
        <TimeLine.Container>
          {articleList?.map((node: any) => (
            <TimeLine.Item
              date={`${node.frontmatter.author} - ${
                node.frontmatter.date || new Date().toLocaleDateString()
              }`}
              title={node.frontmatter.title || node.frontmatter.slug}
              description={node.frontmatter.description || node.excerpt}
              to={node.frontmatter.slug || "/"}
              key={node.id}
              component={Link}
              data-sal="slide-down"
            />
          ))}
        </TimeLine.Container>
      </Container>
    </MainLayout>
  )
}

export default Articles

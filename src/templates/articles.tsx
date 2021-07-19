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

interface IGroupByItem {
  nodes: any[]
}
interface IGroupBy {
  [propsName: string]: IGroupByItem
}

interface IGroupByCurrent {
  all: IGroupByItem
  categories: IGroupBy
  tags: IGroupBy
  series: IGroupBy
}

export interface IArticleGroupProps {
  groupList: IGroupList
  groupBy: IGroupByCurrent
}

function Articles({ pageContext }: PageProps<null, IArticleGroupProps>) {
  const location = useLocation()
  const search = useSearchParams<ISearchParams>(location.search)
  console.log(search)

  const { groupList, groupBy } = pageContext
  const articleList = React.useMemo(() => {
    if (
      !(search.current && search.current !== "none" && search.current !== "")
    ) {
      return groupBy.all.nodes
    }
    const current = groupBy?.[search.group]?.find(
      item => item.fieldValue === search.current
    )
    if (current) {
      return current.nodes
    }
    return groupBy.all?.nodes
  }, [groupBy, search])
  console.log(groupBy)
  return (
    <Container fluid="lg" className="text-dark">
      <ArticleCategoryNav groupList={groupBy} />
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

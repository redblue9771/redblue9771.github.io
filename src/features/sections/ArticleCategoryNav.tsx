import { IArticleGroupProps, ISearchParams } from "@/templates/articles"
import { useSearchParams } from "@/utils/hooks"
import { useLocation } from "@reach/router"
import { Link, PageProps } from "gatsby"
import React from "react"
import {
  Breadcrumb,
  BreadcrumbItemProps,
  Col,
  Container,
  Row,
} from "react-bootstrap"

const BreadcrumbItem = (props: BreadcrumbItemProps) => (
  <Breadcrumb.Item linkAs={Link} {...props} />
)

function ArticleCategoryNav({
  groupList,
  groupBy,
}: Partial<IArticleGroupProps>) {
  const location = useLocation()
  const search = useSearchParams<ISearchParams>(location.search)

  return (
    <Container fluid>
      <Row className="justify-content-end flex-nowrap">
        <Col className="col-auto">
          <strong>📒 分组：</strong>
        </Col>
        <Col className="col-auto">
          <Breadcrumb>
            <BreadcrumbItem
              linkProps={{
                to: `?group=none`,
              }}
              active={
                search.group === "none" || !search.group || search.group === ""
              }
            >
              所有
            </BreadcrumbItem>
            <BreadcrumbItem
              linkProps={{
                to: `?group=categories`,
              }}
              active={search.group === "categories"}
            >
              按分类
            </BreadcrumbItem>
            <BreadcrumbItem
              linkProps={{
                to: `?group=series`,
              }}
              active={search.group === "series"}
            >
              按系列
            </BreadcrumbItem>
            <BreadcrumbItem
              linkProps={{
                to: `?group=tags`,
              }}
              active={search.group === "tags"}
            >
              按标签
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row className="justify-content-end flex-nowrap">
        <Col className="col-auto">
          <strong>🔖 组别：</strong>
        </Col>
        <Col className="col-auto">
          <Breadcrumb>
            <BreadcrumbItem
              linkProps={{
                to: `?group=${search.group}&current=none`,
              }}
              active={
                search.current === "none" ||
                !search.current ||
                search.current === ""
              }
            >
              所有
            </BreadcrumbItem>

            {groupList?.[search.group ?? ""]?.map(
              ({ fieldValue, totalCount }, idx) => (
                <BreadcrumbItem
                  key={idx}
                  title={fieldValue}
                  linkProps={{
                    to: `?group=${search.group}&current=${fieldValue}`,
                  }}
                  active={search.current === fieldValue}
                >
                  {fieldValue}({totalCount})
                </BreadcrumbItem>
              )
            )}
          </Breadcrumb>
        </Col>
      </Row>
    </Container>
  )
}

export default ArticleCategoryNav

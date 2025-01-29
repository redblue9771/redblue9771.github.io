import { SEO } from "@/components"
import { useHeaderMetadataContext } from "@/features/layouts"
import { graphql, PageProps } from "gatsby"
import { Fragment, useEffect } from "react"

import { Button, ButtonGroup, Container } from "react-bootstrap"
export const Head = () => <SEO title="藏经" />
export const query = graphql`
  query queryLibrary($_pathname: String) {
    allBook {
      group(field: { series: SELECT }) {
        fieldValue
        edges {
          node {
            id
            name
            series
            slug
            keywords
            author
            categories
            description
            download
          }
        }
      }
    }
    publicPage(route: { path: { eq: $_pathname } }) {
      title
      subTitle
      description
    }
  }
`

function Library({
  data: { allBook, publicPage },
  pageContext,
}: PageProps<Queries.queryLibraryQuery>) {
  const { setHeaderMetadata } = useHeaderMetadataContext()

  useEffect(() => {
    setHeaderMetadata(() => publicPage)
  }, [])

  return (
    <Container fluid="lg" className="mx-auto">
      {allBook.group.map(({ fieldValue: series, edges }) => (
        <Fragment key={series}>
          <h3 className="text-new">{series}</h3>
          <ul>
            {edges.map(({ node }) => {
              const {
                id,
                name,
                author,
                slug,
                description,
                keywords,
                download,
              } = node
              return (
                <li id={id} className="mb-3 " key={name}>
                  <div>
                    {name} - {author}
                  </div>
                  {description && (
                    <div className="text-muted">简述：{description}</div>
                  )}

                  <div className="text-muted tags mb-3">
                    关键词：{keywords?.join("、")}
                  </div>
                  <ButtonGroup>
                    <Button
                      as="a"
                      href={(download || slug) ?? "/"}
                      target="_blank"
                      rel="contents noopener noreferrer"
                      variant="outline-primary"
                      download
                    >
                      📥 下载 / Download
                    </Button>
                    <Button
                      href={`${slug}`}
                      target="_blank"
                      rel="contents noopener noreferrer"
                      variant="outline-primary"
                    >
                      📖 阅读 / Read
                    </Button>
                  </ButtonGroup>
                </li>
              )
            })}
          </ul>
        </Fragment>
      ))}
    </Container>
  )
}

export default Library

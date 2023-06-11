import { SEO } from "@/components"
import { useSiteMetadataContext } from "@/features/layouts"
import { graphql, PageProps } from "gatsby"
import { Fragment, useEffect } from "react"

import { Button, ButtonGroup, Container } from "react-bootstrap"
export const Head = () => <SEO title="藏经" />
export const query = graphql`
  query queryBooksForLibrary {
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
  }
`

function Library({ data }: PageProps<Queries.queryBooksForLibraryQuery>) {
  const { setMetadata } = useSiteMetadataContext()

  useEffect(() => {
    setMetadata(() => ({
      author: null,
      siteUrl: null,
      date: null,
      title: "藏经",
      subTitle: "博采众长",
      description: "君知其难，则自能旁搜博采",
    }))
  }, [])
  return (
    <Container fluid="lg" className="mx-auto">
      {data.allBook.group.map(({ fieldValue: series, edges }) => (
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

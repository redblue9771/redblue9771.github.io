import { SiteMetadata } from "@/templates/main.layout"
import { graphql, PageProps } from "gatsby"
import React from "react"
import { Container, Button, ButtonGroup } from "react-bootstrap"

export const query = graphql`
  query allBook {
    allBook {
      group(field: series) {
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
          }
        }
      }
    }
  }
`

function Library({ data }: PageProps<Queries.allBookQuery>) {
  const { setMetadata } = React.useContext(SiteMetadata)

  React.useEffect(() => {
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
        <React.Fragment key={series}>
          <h3 className="text-new">{series}</h3>
          <ul>
            {edges.map(({ node }) => {
              const { id, name, author, slug, description, keywords } = node
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
                      href={`${slug}`}
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
        </React.Fragment>
      ))}
    </Container>
  )
}

export default Library

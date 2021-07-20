import { SiteMetadata } from "@/templates/main.layout"
import { graphql, PageProps } from "gatsby"
import React from "react"
import { Container } from "react-bootstrap"
import { AllBookQuery } from "typings/graphql-types"

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

function Library({ data, location }: PageProps<AllBookQuery>) {
  const { setMetadata } = React.useContext(SiteMetadata)

  React.useEffect(() => {
    setMetadata(prev => ({
      title: "藏经",
      subTitle: "博采众长",
      description: "君知其难，则自能旁搜博采",
    }))
  }, [])
  return (
    <Container fluid="lg" className="mx-auto">
      {data.allBook.group.map(({ fieldValue: series, edges }) => (
        <React.Fragment key={series}>
          <h3 className="mb-3 text-new">{series}</h3>
          <ul>
            {edges.map(({ node }) => {
              const { name, author, slug, description, keywords } = node
              return (
                <li id={name} className="mb-3 " key={name}>
                  <div>
                    {name} - {author}
                  </div>
                  {description && (
                    <div className="text-muted">简述：{description}</div>
                  )}

                  <div className="text-muted tags mb-3">
                    关键词：{keywords.join("、")}
                  </div>

                  <a
                    className="d-block btn btn-outline-primary btn-sm text-nowrap"
                    href={`${slug}`}
                    target="_blank"
                    rel="contents noopener noreferrer"
                    download
                  >
                    📥 Download / Read
                  </a>
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

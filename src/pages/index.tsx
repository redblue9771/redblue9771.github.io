import { SEO } from "@/components"
import { useHeaderMetadataContext } from "@/features/layouts"
import type { Repository } from "@/github.schema.types.generated"
import { graphql, PageProps } from "gatsby"
import { useEffect, useState } from "react"
import { Carousel, Col, Container, Figure, Row } from "react-bootstrap"

export const query = graphql`
  query IndexPage($_pathname: String) {
    allCarousel(filter: { for: { eq: "homePage" } }) {
      nodes {
        id
        description
        cover
        link
        title
      }
    }
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      limit: 5
      filter: { frontmatter: { draft: { ne: true } } }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          slug
          description
          author
          date(formatString: "MMMM DD,YYYY")
        }
        id
        excerpt(pruneLength: 100, truncate: true)
      }
    }
    publicPage(route: { path: { eq: $_pathname } }) {
      title
      subTitle
      description
    }
  }
`
export const Head = ({ data: { publicPage } }) => {
  return (
    <>
      <SEO title="其实你知的我是那面" description="New Youth, New Vision." />
    </>
  )
}
const IndexPage = ({
  data,
  pageContext,
}: PageProps<Queries.IndexPageQuery>) => {
  const { allMarkdownRemark, allCarousel, publicPage } = data
  const [repositories, setRepositories] = useState<Repository[]>([])
  const { setHeaderMetadata } = useHeaderMetadataContext()

  useEffect(() => {
    setHeaderMetadata(() => publicPage)
    fetch("https://api.github.com/graphql", {
      method: "POST",
      body: JSON.stringify({
        query: `
          query {
            viewer {
              repositories(
                privacy: PUBLIC
                isFork: false
                first: 5
                orderBy: { field: UPDATED_AT, direction: DESC }
              ) {
                nodes {
                  name
                  description
                  url
                }
              }
            }
          }
      `,
      }),
      headers: {
        Authorization: `bearer ${process.env.GATSBY_GITHUB_TOKEN}`,
      },
    })
      .then(res => res.json())
      .then(res => {
        setRepositories(res?.data?.viewer?.repositories?.nodes ?? [])
      })
  }, [])

  const handlePush = (link: string) => () => {
    window.open(link, "_blank")
  }

  return (
    <>
      <Carousel variant="dark" className="showcase">
        {allCarousel.nodes.map(({ id, title, link, cover, description }) => (
          <Carousel.Item key={id} onClick={handlePush(link ?? "")}>
            <img
              className="d-block w-100 showcase-item"
              alt={title ?? ""}
              title={title ?? ""}
              src={cover ?? ""}
            />
            <Carousel.Caption className="showcase-item-text">
              <h4>{title}</h4>
              <p>{description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <Container fluid>
        <Row className="index-module-0">
          <img
            src="/img/gopher_head.png"
            alt=""
            className="index-module-0__header mx-auto"
          />
        </Row>
        <Row className="index-module-1 text-center text-white">
          <Col sm={12}>
            <h2>I'm RedBlue.</h2>
            <h3 className="slogan">你好，我是赤琦。</h3>
          </Col>
          <Container
            as={Row}
            fluid="lg"
            className="index-module-1__content mx-auto p-0"
          >
            <Col className="index-module-1__content__block" sm={12} md={4}>
              <dl>
                <dt>
                  <h4>·&nbsp;博文&nbsp;·</h4>
                </dt>
                {allMarkdownRemark?.nodes?.map((node: any) => (
                  <dd key={node.id} className="text-light">
                    <a
                      className="d-block text-truncate text-reset text-decoration-none"
                      href={node?.frontmatter?.slug || node?.fields?.slug || ""}
                      title={
                        node?.frontmatter?.description || node.excerpt || ""
                      }
                      target="_blank"
                    >
                      {node?.frontmatter?.title}

                      <small className="d-block text-truncate text-white-50">
                        {node?.frontmatter?.author} - {node?.frontmatter?.date}
                      </small>
                    </a>
                  </dd>
                ))}
              </dl>
            </Col>
            <Col
              className="index-module-1__content__block text-dark"
              sm={12}
              md={4}
            >
              <dl>
                <dt>
                  <h4>·&nbsp;项目&nbsp;·</h4>
                </dt>
                {repositories.length === 0 && (
                  <dd>
                    <p className="masked">
                      🏃‍♂️ 从 github.com/redblue9771 拉取中…
                    </p>
                  </dd>
                )}
                {repositories.map(({ name, description, url }) => (
                  <dd key={name}>
                    <a
                      href={url}
                      className="d-block text-truncate text-reset text-decoration-none"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {name}
                      <small className="d-block text-truncate">
                        {description || "No Description"}
                      </small>
                    </a>
                  </dd>
                ))}
              </dl>
            </Col>
            <Col className="index-module-1__content__block" sm={12} md={4}>
              <dl>
                <dt>
                  <h4>·&nbsp;关于&nbsp;·</h4>
                </dt>
                <dd>
                  <p>赤红 · 琦蓝</p>
                </dd>
                <dd>
                  <p>Base in 滇南中心城市</p>
                </dd>
                <dd>
                  <p>榕城：福建理工大学 · FJUTer</p>
                </dd>
                <dd>
                  <p>Studding at FreeCodeCamp</p>
                </dd>
                <dd>
                  <p>偏执的完美主义者，追求源于热爱</p>
                </dd>
                <dd>
                  <p>Make work. Make right. Make Fast.</p>
                </dd>
              </dl>
            </Col>
          </Container>
        </Row>
        {/* <div className="circles">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <span></span>
        </div> */}
        <Container
          as={Row}
          fluid="lg"
          className="index-module-2__content mx-auto p-0"
        >
          <h4 className="text-center">·&nbsp;编码统计&nbsp;·</h4>
          <Figure>
            <object
              title="编码统计"
              type="image/svg+xml"
              data="https://wakatime.com/share/@redblue/31eeb3ce-ba04-46d4-be43-9c09edf88c5c.svg"
            />
          </Figure>
        </Container>
      </Container>
    </>
  )
}

export default IndexPage

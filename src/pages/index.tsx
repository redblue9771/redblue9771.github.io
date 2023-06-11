import { SEO } from "@/components"
import { useSiteMetadataContext } from "@/features/layouts"
import type { Repository } from "@/typings/github.schemas"
import { graphql, PageProps } from "gatsby"
import { useEffect, useState } from "react"
import { Carousel, Col, Container, Figure, Row } from "react-bootstrap"

export const query = graphql`
  query IndexPage {
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
  }
`
export const Head = () => (
  <SEO title="其实你知的我是那面" description="JUST FOR MAN FASHION NEWISM." />
)
const IndexPage = ({ data }: PageProps<Queries.IndexPageQuery>) => {
  const { allMarkdownRemark, allCarousel } = data
  const { setMetadata } = useSiteMetadataContext()

  const [repositories, setRepositories] = useState<Repository[]>([])

  useEffect(() => {
    setMetadata(() => ({
      author: null,
      siteUrl: null,
      date: null,
      title: "RedBlue | 赤琦",
      subTitle: "凡所有相，皆是虚妄",
      description: "JUST FOR MAN FASHION NEWISM.",
    }))
  }, [])

  useEffect(() => {
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
          <Carousel.Item key={id} onClick={handlePush(link || "")}>
            <img
              className="d-block w-100 showcase-item"
              alt={title || ""}
              title={title || ""}
              src={cover || ""}
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

                      <small className="d-block text-truncate">
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
                  <p>
                    🙋‍♂️ 赤琦：赤红色的美玉
                    <br />✨ RedBlue：据赤红，琦蓝而译
                  </p>
                </dd>
                <dd>
                  <p>👨‍💻 Location：红河</p>
                </dd>
                <dd>
                  <p>🎓 专业：物联网工程</p>
                </dd>
                <dd>
                  <p>
                    ⚛️ 简介：来自彩云之南的 95
                    后男孩，偏执的完美主义者，体现在方方面面。
                    <br />
                    爱科技、爱搞机、爱摄影、爱一切美好的事物，追求源于热爱。
                  </p>
                </dd>
              </dl>
            </Col>
          </Container>
        </Row>
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

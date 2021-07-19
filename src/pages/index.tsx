import { IndexPageQuery } from "@/../typings/graphql-types"
import carouselData from "@/data/carousel.json"
import { graphql, Link, PageProps } from "gatsby"
import React from "react"
import { Carousel, Col, Container, Figure, Row } from "react-bootstrap"

export const query = graphql`
  query IndexPage {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
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

const IndexPage = ({ data }: PageProps<IndexPageQuery>) => {
  const { allMarkdownRemark } = data

  return (
    <React.Fragment>
      <Carousel variant="dark">
        {Object.values(carouselData).map(
          ({ title, link, cover, description }: any) => (
            <Carousel.Item
              key={link}
              as="a"
              href={link}
              target="_blank"
              rel="noolopp"
            >
              <img
                className="d-block w-100 showcase-item"
                alt={title}
                title={title}
                src={cover}
              />
              <Carousel.Caption className="showcase-item-text">
                <h4>{title}</h4>
                <p>{description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          )
        )}
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
            <h2>I'm RedBlue</h2>
            <h3>你好，我是赤琦</h3>
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
                {allMarkdownRemark?.nodes?.map(node => (
                  <dd key={node.id} className="text-light">
                    <Link
                      className="d-block text-truncate text-light"
                      to={node?.frontmatter?.slug || node?.fields?.slug || ""}
                      title={
                        node?.frontmatter?.description || node.excerpt || ""
                      }
                    >
                      {node?.frontmatter?.title}
                    </Link>
                    <small className="d-block text-truncate text-white">
                      {node?.frontmatter?.author} - {node?.frontmatter?.date}
                    </small>
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
    </React.Fragment>
  )
}

export default IndexPage

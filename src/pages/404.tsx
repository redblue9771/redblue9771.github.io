import { SiteMetadata } from "@/templates/main.layout"
import { graphql, Link, PageProps } from "gatsby"
import React from "react"
import { Carousel, Container } from "react-bootstrap"
import { NotFoundPageQuery } from "typings/graphql-types"

export const query = graphql`
  query notFoundPage {
    allCarousel(filter: { for: { eq: "homePage" } }) {
      nodes {
        id
        description
        cover
        link
        title
      }
    }
  }
`

const NotFoundPage = ({ data }: PageProps<NotFoundPageQuery>) => {
  const { setMetadata } = React.useContext(SiteMetadata)

  React.useEffect(() => {
    setMetadata(prev => ({
      subTitle: "404: Page Not Found!",
      description: "天涯何处无芳草，何必单恋这一页",
    }))
  }, [])

  return (
    <Container fluid="lg" className="mx-auto">
      <img alt="404" src="/img/404.svg" />
      <div className="alert alert-primary" role="alert">
        <h4>
          页面不存在，旧站的页面链接已经改变，请到
          <Link to="/">主页</Link>
          中寻找
        </h4>
      </div>
      <Carousel variant="dark">
        {data.allCarousel.nodes.map(
          ({ id, title, link, cover, description }) => (
            <Carousel.Item
              key={id}
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
    </Container>
  )
}

export default NotFoundPage

import {
  useHeaderMetadataContext,
  type IHeaderMetadata,
} from "@/features/layouts"
import { useLocation } from "@reach/router"
import { graphql, Link, useStaticQuery } from "gatsby"
import { useCallback, useLayoutEffect, useState } from "react"

import { Container, Nav, Navbar } from "react-bootstrap"

interface IMainNavBarProps {
  absElementTop: number
}

const query = graphql`
  query MetadataForNavbar {
    site {
      siteMetadata {
        title
        siteUrl
        description
        author
      }
    }
    allPublicPage(filter: { _hidden: { eq: false } }) {
      nodes {
        id
        route {
          title {
            cn
          }
          path
          _external
        }
      }
    }
  }
`
export const MainNavbar = ({ absElementTop }: IMainNavBarProps) => {
  const [isOverTop, setIsOverTop] = useState(false)
  const [toggleBar, setToggleBar] = useState(false)
  const { site, allPublicPage } = useStaticQuery(query)
  const location = useLocation()
  const { headerMetadata } = useHeaderMetadataContext()

  const handleScroll = useCallback(() => {
    requestAnimationFrame(() => {
      const isScrolledPastHalf = window.scrollY > absElementTop / 2
      if (isScrolledPastHalf && !isOverTop) {
        setIsOverTop(true)
      } else if (!isScrolledPastHalf && isOverTop) {
        setIsOverTop(false)
      }
    })
  }, [isOverTop, absElementTop])

  useLayoutEffect(() => {
    document.addEventListener("scroll", handleScroll)
    return () => {
      document.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  const handleToggle = (e: boolean) => {
    setToggleBar(e)
  }

  useLayoutEffect(() => {
    setToggleBar(location.pathname ? false : true)
  }, [location.pathname])

  return (
    <Navbar
      collapseOnSelect
      variant="dark"
      expand="lg"
      fixed="top"
      expanded={toggleBar}
      onToggle={handleToggle}
      className={`navbar ${isOverTop || toggleBar ? "navScroll" : ""}`}
    >
      <Container fluid="lg" className={`gx-4 ${toggleBar ? "showBar" : ""}`}>
        <Navbar.Brand
          as={Link}
          to="/"
          className={`text-truncate ${!isOverTop ? "slogan" : ""}`}
        >
          {isOverTop ? headerMetadata.title : site.siteMetadata.title}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" as="div" />
        <Navbar.Collapse id="navbarScroll" className="flex-grow-0">
          <Nav navbarScroll>
            {allPublicPage.nodes.map(({ id, route }) =>
              route._external ? (
                <Nav.Link
                  key={id}
                  href={route.path}
                  className="text-center"
                  disabled={location.pathname === route.path}
                >
                  &nbsp;/ {route.title.cn} /&nbsp;
                </Nav.Link>
              ) : (
                <Nav.Link
                  key={id}
                  as={Link}
                  to={route.path || "/404"}
                  className="text-center"
                  disabled={location.pathname === route.path}
                >
                  &nbsp;/ {route.title.cn} /&nbsp;
                </Nav.Link>
              ),
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

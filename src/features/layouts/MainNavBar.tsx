import type { ICustomSiteMetadata } from "@/templates/main.layout"
import { useLocation } from "@reach/router"
import clsx from "clsx"
import { graphql, Link, useStaticQuery } from "gatsby"
import React from "react"
import { Container, Nav, Navbar } from "react-bootstrap"

const routes = [
  { title: { cn: "主页" }, path: "/" },
  { title: { cn: "博文" }, path: "/articles" },
  { title: { cn: "藏经" }, path: "/library" },
  { title: { cn: "项目" }, path: "/repositories" },
  {
    title: { cn: "状态" },
    path: "https://status.redblue.fun/",
    external: true,
  },
]

interface IMainNavBarProps {
  context: ICustomSiteMetadata
  absElementTop: number
}

const query = graphql`
  query siteMeta {
    site {
      siteMetadata {
        title
        siteUrl
        description
        author
      }
    }
  }
`
function MainNavBar({ absElementTop, context }: IMainNavBarProps) {
  const [isOverTop, setIsOverTop] = React.useState(false)
  const [toggleBar, setToggleBar] = React.useState(false)
  const { site } = useStaticQuery(query)
  const location = useLocation()

  const handleScroll = React.useCallback(() => {
    requestAnimationFrame(() => {
      if (window.pageYOffset > absElementTop / 2) {
        if (!isOverTop) {
          setIsOverTop(true)
        }
      } else if (isOverTop) {
        setIsOverTop(false)
      }
    })
  }, [isOverTop, absElementTop])

  React.useLayoutEffect(() => {
    document.addEventListener("scroll", handleScroll)
    return () => {
      document.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  const handleToggle = e => {
    setToggleBar(e)
  }

  React.useLayoutEffect(() => {
    if (location.pathname) {
      setToggleBar(false)
    }
  }, [location.pathname])

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      fixed="top"
      expanded={toggleBar}
      onToggle={handleToggle}
      className={clsx(
        "navbar",
        "text-light",
        (isOverTop || toggleBar) && "navScroll"
      )}
    >
      <Container fluid="lg" className={clsx("gx-4", toggleBar && "showBar")}>
        <Navbar.Brand
          as={Link}
          to="/"
          className={clsx("text-truncate text-reset", !isOverTop && "slogan")}
        >
          {isOverTop ? context.subTitle : site.siteMetadata.title}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" as="div" />
        <Navbar.Collapse id="navbarScroll" className="flex-grow-0">
          <Nav navbarScroll>
            {routes.map(({ title, path, external }) =>
              external ? (
                <Nav.Link
                  key={path}
                  href={path}
                  className="text-center text-reset"
                >
                  &nbsp;/ {title.cn} /&nbsp;
                </Nav.Link>
              ) : (
                <Nav.Link
                  key={path}
                  as={Link}
                  to={path || "/404/"}
                  className="text-center text-reset"
                  active={location.pathname === "path"}
                >
                  &nbsp;/ {title.cn} /&nbsp;
                </Nav.Link>
              )
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MainNavBar

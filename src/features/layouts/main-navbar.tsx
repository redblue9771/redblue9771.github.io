import type { ICustomSiteMetadata } from "@/features/layouts"
import { useLocation } from "@reach/router"
import clsx from "clsx"
import { graphql, Link, useStaticQuery } from "gatsby"
import { useCallback, useLayoutEffect, useState } from "react"

import { Container, Nav, Navbar } from "react-bootstrap"

const routes = [
  { title: { cn: "主页" }, path: "/" },
  { title: { cn: "博文" }, path: "/articles/" },
  { title: { cn: "藏经" }, path: "/library/" },
  { title: { cn: "项目" }, path: "/repositories/" },
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
export const MainNavbar = ({ absElementTop, context }: IMainNavBarProps) => {
  const [isOverTop, setIsOverTop] = useState(false)
  const [toggleBar, setToggleBar] = useState(false)
  const { site } = useStaticQuery(query)
  const location = useLocation()

  const handleScroll = useCallback(() => {
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
    if (location.pathname) {
      setToggleBar(false)
    }
  }, [location.pathname])

  return (
    <Navbar
      collapseOnSelect
      variant="dark"
      expand="lg"
      fixed="top"
      expanded={toggleBar}
      onToggle={handleToggle}
      className={clsx("navbar", (isOverTop || toggleBar) && "navScroll")}
    >
      <Container fluid="lg" className={clsx("gx-4", toggleBar && "showBar")}>
        <Navbar.Brand
          as={Link}
          to="/"
          className={clsx("text-truncate", !isOverTop && "slogan")}
        >
          {isOverTop ? context.subTitle : site.siteMetadata.title}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" as="div" />
        <Navbar.Collapse id="navbarScroll" className="flex-grow-0">
          <Nav navbarScroll>
            {routes.map(({ title, path, external }) =>
              external ? (
                <Nav.Link key={path} href={path} className="text-center">
                  &nbsp;/ {title.cn} /&nbsp;
                </Nav.Link>
              ) : (
                <Nav.Link
                  key={path}
                  as={Link}
                  to={path || "/404/"}
                  className="text-center"
                  disabled={location.pathname === path}
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

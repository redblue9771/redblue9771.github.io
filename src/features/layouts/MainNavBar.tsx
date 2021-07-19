import { ISiteSiteMetadata } from "@/templates/main.layout"
import clsx from "clsx"
import { graphql, Link, useStaticQuery } from "gatsby"
import React from "react"
import { Container, Nav, Navbar } from "react-bootstrap"
const routes = [
  { title: { cn: "主页" }, path: "/" },
  { title: { cn: "博文" }, path: "/articles" },
  { title: { cn: "藏经" }, path: "/libraries" },
  { title: { cn: "项目" }, path: "/repositories" },
  {
    title: { cn: "状态" },
    path: "https://status.redblue.fun/",
    external: true,
  },
]

interface IMainNavBarProps {
  context: ISiteSiteMetadata
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
  const [isTopArea, setIsTopArea] = React.useState(false)
  const [toggleBar, setToggleBar] = React.useState(false)
  const { site } = useStaticQuery(query)

  const handleScroll = React.useCallback(() => {
    requestAnimationFrame(() => {
      if (window.pageYOffset > absElementTop / 2) {
        if (!isTopArea) {
          setIsTopArea(true)
        }
      } else if (isTopArea) {
        setIsTopArea(false)
      }
    })
  }, [isTopArea, absElementTop])

  React.useEffect(() => {
    document.addEventListener("scroll", handleScroll)
    return () => {
      document.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  const handleToggle = () => {
    setToggleBar(!toggleBar)
  }

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      fixed="top"
      variant="dark"
      className={clsx(
        "navbar",
        (isTopArea || toggleBar) && "navScroll",
        toggleBar && "showBar"
      )}
    >
      <Container fluid="lg" className="gx-4">
        <Navbar.Brand as={Link} to="/">
          {isTopArea ? context.subTitle : site.siteMetadata.title}
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbarScroll"
          onClick={handleToggle}
          as="div"
        />
        <Navbar.Collapse id="navbarScroll" className="flex-grow-0">
          <Nav navbarScroll>
            {routes.map(({ title, path, external }) =>
              external ? (
                <Nav.Link
                  key={path}
                  href={path}
                  className="text-center text-light"
                >
                  &nbsp;/ {title.cn} /&nbsp;
                </Nav.Link>
              ) : (
                <Nav.Link
                  key={path}
                  as={Link}
                  to={path || "/404/"}
                  className="text-center text-light"
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

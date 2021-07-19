import clsx from "clsx"
import { Link } from "gatsby"
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

function MainNavBar({
  title = "RedBlue | 赤琦",
  styleName = "",
  absElementTop = 0,
}) {
  const [isTopArea, setIsTopArea] = React.useState(false)
  const [toggleBar, setToggleBar] = React.useState(false)

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
    // <Navbar className="mx-auto" expand="md" data-sal="slide-down">
    //   <Navbar.Brand
    //     as="a"
    //     id="main-title"
    //     className="flex-grow-1 text-truncate text-white"
    //     onClick={() => {
    //       navigate("#")
    //     }}
    //     style={{
    //       maxWidth: "calc(100% - 3rem)",
    //     }}
    //   >
    //     {title}
    //   </Navbar.Brand>

    //   <Navbar.Toggle
    //     as="a"
    //     className="border-0 text-white btn-menu"
    //     onClick={handleToggle}
    //   >
    //     <span className="bar" />
    //   </Navbar.Toggle>

    //   <Navbar.Collapse className="overlay justify-content-end">
    //     <Nav className="nav-justified ml-auto">{renderRouter}</Nav>
    //   </Navbar.Collapse>
    // </Navbar>

    <Navbar
      collapseOnSelect
      expand="lg"
      fixed="top"
      variant="dark"
      className={clsx("navbar", isTopArea && "navScroll")}
    >
      <Container fluid="lg">
        <Navbar.Brand href="#home" className="me-auto">
          React-Bootstrap
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav navbarScroll>
            {routes.map(({ title, path, external }) =>
              external ? (
                <Nav.Link key={path} href={path}>
                  &nbsp;/ {title.cn} /&nbsp;
                </Nav.Link>
              ) : (
                <Nav.Link key={path} as={Link} to={path || "/404/"}>
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

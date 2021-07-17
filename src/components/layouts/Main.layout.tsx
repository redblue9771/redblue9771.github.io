import React from "react"
import { Container } from "react-bootstrap"
import { useClientRect } from "../../utils/hooks"
import Footer from "./Footer"
import Header from "./Header"
import Navbar from "./MainNavBar"

function LaunchLayout({ children }: { children: React.ReactNode }) {
  const [rect, headerRoot] = useClientRect()

  return (
    <React.Fragment>
      <Navbar absElementTop={rect?.top ?? 0} />
      <Header />
      <main ref={headerRoot}>{children}</main>
      <Footer />
    </React.Fragment>
  )
}

export default LaunchLayout

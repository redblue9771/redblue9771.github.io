import "@/global.scss"
import { useClientRect } from "@/utils/hooks"
import React from "react"
import Footer from "../features/layouts/Footer"
import Header from "../features/layouts/Header"
import Navbar from "../features/layouts/MainNavBar"

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

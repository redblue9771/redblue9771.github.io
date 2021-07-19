import { SEO } from "@/components"
import "@/global.scss"
import { useClientRect } from "@/utils/hooks"
import React, { Dispatch, SetStateAction } from "react"
import { SiteSiteMetadata } from "typings/graphql-types"
import Footer from "../features/layouts/Footer"
import Header from "../features/layouts/Header"
import Navbar from "../features/layouts/MainNavBar"

export interface ISiteSiteMetadata extends SiteSiteMetadata {
  subTitle?: string
  date?: string
}

interface ISiteMetadata {
  metadata: ISiteSiteMetadata
  setMetadata: Dispatch<SetStateAction<SiteSiteMetadata>>
}

const defaultContextValue: ISiteMetadata = {
  metadata: {},
  setMetadata: () => {},
}

export const SiteMetadata = React.createContext(defaultContextValue)

function LaunchLayout({ children }: { children: React.ReactNode }) {
  const [rect, headerRoot] = useClientRect()
  const [metadata, setMetadata] = React.useState(defaultContextValue.metadata)

  console.log(metadata)

  return (
    <React.Fragment>
      <SEO {...metadata} />
      <Navbar absElementTop={rect?.top ?? 0} context={metadata} />
      <Header context={metadata} />
      <main ref={headerRoot}>
        <SiteMetadata.Provider
          value={{
            metadata,
            setMetadata,
          }}
        >
          {children}
        </SiteMetadata.Provider>
      </main>
      <Footer />
    </React.Fragment>
  )
}

export default LaunchLayout

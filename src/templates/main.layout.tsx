import { SEO } from "@/components"
import "@/global.scss"
import { useClientRect } from "@/utils/hooks"
import React, { Dispatch, SetStateAction } from "react"
import Footer from "../features/layouts/Footer"
import Header from "../features/layouts/Header"
import Navbar from "../features/layouts/MainNavBar"

export type ICustomSiteMetadata = Queries.SiteSiteMetadata & {
  subTitle: Queries.Maybe<string>
  date: Queries.Maybe<string>
}

type IPageMetadata = {
  metadata: ICustomSiteMetadata
  setMetadata: Dispatch<SetStateAction<ICustomSiteMetadata>>
}

const defaultContextValue: IPageMetadata = {
  metadata: {
    author: null,
    description: null,
    siteUrl: null,
    title: null,
    subTitle: null,
    date: null,
  },
  setMetadata: () => {},
}

export const SiteMetadata = React.createContext(defaultContextValue)

function LaunchLayout({ children }: { children: React.ReactNode }) {
  const [rect, headerRoot] = useClientRect()
  const [metadata, setMetadata] = React.useState(defaultContextValue.metadata)

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

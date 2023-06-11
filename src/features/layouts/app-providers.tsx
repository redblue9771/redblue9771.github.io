import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react"

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
const SiteMetadataContext = createContext(defaultContextValue)

export const AppProviders: (
  T: React.PropsWithChildren
) => React.JSX.Element = ({ children }) => {
  const [metadata, setMetadata] = useState(defaultContextValue.metadata)
  return (
    <>
      <SiteMetadataContext.Provider
        value={{
          metadata,
          setMetadata,
        }}
      >
        {children}
      </SiteMetadataContext.Provider>
    </>
  )
}

export const useSiteMetadataContext = () => {
  return useContext(SiteMetadataContext)
}

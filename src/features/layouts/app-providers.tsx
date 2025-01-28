import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react"

export type IHeaderMetadata = {
  title: Queries.Maybe<string>
  subTitle: Queries.Maybe<string>
  description: Queries.Maybe<string>
}

type IHeaderMetadataDispatcher = {
  headerMetadata: IHeaderMetadata
  setHeaderMetadata: Dispatch<SetStateAction<IHeaderMetadata>>
}

const defaultHeaderContextValue: IHeaderMetadataDispatcher = {
  headerMetadata: {
    title: null,
    subTitle: null,
    description: null,
  },
  setHeaderMetadata: () => {},
}
const HeaderMetaDataContext = createContext(defaultHeaderContextValue)

export const AppProviders: (
  T: React.PropsWithChildren,
) => React.JSX.Element = ({ children }) => {
  const [headerMetadata, setHeaderMetadata] = useState(
    defaultHeaderContextValue.headerMetadata,
  )
  return (
    <HeaderMetaDataContext.Provider
      value={{ headerMetadata, setHeaderMetadata }}
    >
      {children}
    </HeaderMetaDataContext.Provider>
  )
}

export const useHeaderMetadataContext = () => {
  return useContext(HeaderMetaDataContext)
}

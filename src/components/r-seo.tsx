import { useSiteMetadataContext } from "@/features/layouts"
import { useSiteMetadata } from "@/hooks"

type ISEOProps = React.PropsWithChildren<{
  title?: string
  description?: string
  pathname?: string
}>

export const SEO = ({ title, description, children }: ISEOProps) => {
  const { title: defaultTitle, description: defaultDescription } =
    useSiteMetadata()

  return (
    <>
      <html lang="zh-cmn-Hans" />
      <title>{`${title || defaultTitle} - ${defaultTitle}`}</title>
      <meta
        name="description"
        content={description || defaultDescription || ""}
      />
      {children}
    </>
  )
}

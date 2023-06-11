import { graphql, useStaticQuery } from "gatsby"

export const useSiteMetadata: () => Required<
NonNullable< NonNullable<Queries.SiteMetadataQuery["site"]>["siteMetadata"]>
> = () => {
  const data = useStaticQuery<Queries.SiteMetadataQuery>(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `)

  return data?.site?.siteMetadata ?? { title: "", description: "", siteUrl: "" }
}

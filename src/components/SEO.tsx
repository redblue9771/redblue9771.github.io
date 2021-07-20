import React from "react"
import { Helmet } from "react-helmet"
import { useLocation } from "@reach/router"
import { useStaticQuery, graphql } from "gatsby"
import { SiteSiteMetadata } from "typings/graphql-types"

const SEO = ({ title, description }: SiteSiteMetadata) => {
  const { pathname } = useLocation()
  const { site } = useStaticQuery(query)
  const location = useLocation()
  console.log(site)
  const {
    title: defaultTitle,
    titleTemplate,
    defaultDescription,
    siteUrl,
    defaultImage,
    twitterUsername,
    author,
  } = site.siteMetadata

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${defaultImage}`,
    url: `${siteUrl}${pathname}`,
  }

  return (
    <Helmet
      title={seo.title}
      titleTemplate={`%s - ${
        location.pathname === "" || location.pathname === "/"
          ? "其实你知的我是那面"
          : site.siteMetadata.title
      }`}
      htmlAttributes={{
        lang: "zh-cmn-Hans",
      }}
    >
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      {seo.url && <meta property="og:url" content={seo.url} />}
      {/* {(article ? true : null) && <meta property="og:type" content="article" />} */}
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}
      {seo.image && <meta property="og:image" content={seo.image} />}
      <meta name="twitter:card" content="summary_large_image" />
      {twitterUsername && (
        <meta name="twitter:creator" content={twitterUsername} />
      )}
      {seo.title && <meta name="twitter:title" content={seo.title} />}
      {seo.description && (
        <meta name="twitter:description" content={seo.description} />
      )}
      {seo.image && <meta name="twitter:image" content={seo.image} />}
    </Helmet>
  )
}
const query = graphql`
  query SEO {
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
export default SEO

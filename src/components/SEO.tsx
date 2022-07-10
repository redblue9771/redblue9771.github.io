import type { ICustomSiteMetadata } from "@/templates/main.layout"
import { useLocation } from "@reach/router"
import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"

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

const SEO = ({ title, description }: ICustomSiteMetadata) => {
  const { pathname } = useLocation()
  const { site } = useStaticQuery<Queries.SEOQuery>(query)
  const location = useLocation()

  const {
    title: defaultTitle,
    description: defaultDescription,
    siteUrl,
    author,
  } = site?.siteMetadata ?? {}

  const seo = {
    title: `${title ?? defaultTitle}`,
    description: `${description ?? defaultDescription}`,
    image: `${siteUrl}`,
    url: `${siteUrl}${pathname}`,
  }

  return (
    <Helmet
      title={seo.title}
      titleTemplate={`%s - ${
        location.pathname === "" || location.pathname === "/"
          ? "其实你知的我是那面"
          : seo.title
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
      {/* {twitterUsername && (
        <meta name="twitter:creator" content={twitterUsername} />
      )} */}
      {seo.title && <meta name="twitter:title" content={seo.title} />}
      {seo.description && (
        <meta name="twitter:description" content={seo.description} />
      )}
      {seo.image && <meta name="twitter:image" content={seo.image} />}
    </Helmet>
  )
}

export default SEO

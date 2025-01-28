import type { GatsbyConfig } from "gatsby"
import * as dotenv from "dotenv"

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
})

type TypeNameFuncArgs = {
  node: {
    name: string
  }
}

const config: GatsbyConfig = {
  jsxRuntime: "automatic",
  graphqlTypegen: {
    generateOnBuild: true,
  },
  siteMetadata: {
    title: `RedBlue | 赤琦`,
    author: `RedBlue`,
    description: `RedBlue(赤琦)，来自彩云之南的 95 后男孩，偏执的完美主义者，体现在方方面面。爱科技、爱搞机、爱摄影、爱一切美好的事物，追求源于热爱。`,
    siteUrl: `https://redblue.fun`,
    social: {},
    copyright: {
      startYear: 2017,
      endYear: "now",
      holder: "赤琦",
    },
  },
  trailingSlash: "never",
  plugins: [
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: process.env.GATSBY_GOOGLE_ANALYTICS_ID || "none",
      },
    },
    `gatsby-plugin-scroll-reveal`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `general`,
        path: `${__dirname}/src/assets/general`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `article`,
        path: `${__dirname}/src/assets/articles`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static/img`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-yaml`,
      options: {
        typeName: ({ node }: TypeNameFuncArgs) => {
          return node.name
        },
      },
    },

    {
      resolve: `gatsby-plugin-sass`,
      options: {
        sassOptions: {
          precision: 6,
        },
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-images`,
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-prismjs`,
          `gatsby-remark-katex`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `RedBlue | 赤琦`,
        short_name: `RedBlue | 赤琦`,
        start_url: `/`,
        background_color: `#448aff`,
        theme_color: `#2196f3`,
        display: `standalone`,
        icon: `static/logo.svg`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({
              query: { site, allMarkdownRemark },
            }: {
              query: Queries.Query
            }) => {
              return allMarkdownRemark.edges.map(edge => ({
                ...edge.node.frontmatter,
                description: edge.node.excerpt,
                date: edge.node.frontmatter?.date,
                url: `${site?.siteMetadata?.siteUrl}${edge?.node?.fields?.slug}`,
                guid: `${site?.siteMetadata?.siteUrl}${edge?.node?.fields?.slug}`,
                custom_elements: [{ "content:encoded": edge.node.html }],
              }))
            },
            query: `{
              allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
                edges {
                  node {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            }`,
            output: "/index.xml",
            title: "RedBlue's RSS Feed",
          },
        ],
      },
    },
  ],
}

export default config

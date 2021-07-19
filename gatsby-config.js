module.exports = {
  siteMetadata: {
    title: `RedBlue | 赤琦`,
    author: `RedBlue`,
    description: `RedBlue(赤琦)，来自彩云之南的 95 后男孩，偏执的完美主义者，体现在方方面面。爱科技、爱搞机、爱摄影、爱一切美好的事物，追求源于热爱。`,
    siteUrl: `https://redblue.fun/`,
    social: {},
  },
  plugins: [
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/templates/main.layout.tsx`),
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-scroll-reveal`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`,
      },
    },
    {
      resolve: `gatsby-transformer-yaml`,
      options: {
        typeName: ({ node, object, isArray }) => {
          console.log(node)
          return node.name
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        sassOptions: {
          precision: 6,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-bootstrap-5`,
        short_name: `gb5-starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `standalone`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-graphql-codegen`,
      options: {
        fileName: `./typings/graphql-types.ts`,
        documentPaths: [
          "./src/**/*.{ts,tsx}",
          "./node_modules/gatsby-*/**/*.js",
        ],
      },
    },
  ],
}

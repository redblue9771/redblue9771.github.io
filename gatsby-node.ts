import type { GatsbyNode } from "gatsby"
import { createFilePath } from "gatsby-source-filesystem"
import path from "path"

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
      alias: { "@": path.resolve(__dirname, "src") },
    },
  })
}

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  async ({ actions: { createTypes } }) => {
    createTypes(`
     type MarkdownRemark implements Node {
      slug: File @link(from: "fields.slug")
     }
   `)
  }

export const onCreateNode: GatsbyNode["onCreateNode"] = async ({
  node,
  getNode,
  actions: { createNodeField },
}) => {
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, trailingSlash: false })

    createNodeField({
      node,
      name: `slug`,
      value: `/articles${slug.toLowerCase()}`,
    })
  }
}

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions
  const { data: categoryNodes, errors: err1 } = await graphql<Queries.Query>(`
    query allArticleGroupByCategories {
      allMarkdownRemark(
        filter: { frontmatter: { draft: { ne: true } } }
        sort: { frontmatter: { date: DESC } }
      ) {
        totalCount
        group(field: { frontmatter: { categories: SELECT } }) {
          fieldValue
          totalCount
          nodes {
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              description
              slug
              draft
              author
            }
            id
            excerpt(truncate: true, pruneLength: 150)
          }
        }
      }
    }
  `)
  const { data: tagNodes, errors: err2 } = await graphql<Queries.Query>(`
    query allArticleGroupByTags {
      allMarkdownRemark(
        filter: { frontmatter: { draft: { ne: true } } }
        sort: { frontmatter: { date: DESC } }
      ) {
        totalCount
        group(field: { frontmatter: { tags: SELECT } }) {
          fieldValue
          totalCount
          nodes {
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              description
              slug
              draft
              author
            }
            id
            excerpt(truncate: true, pruneLength: 150)
          }
        }
      }
    }
  `)
  const { data: seriesNodes, errors: err3 } = await graphql<Queries.Query>(`
    query allArticleGroupBySeries {
      allMarkdownRemark(
        filter: { frontmatter: { draft: { ne: true } } }
        sort: { frontmatter: { date: DESC } }
      ) {
        totalCount
        group(field: { frontmatter: { series: SELECT } }) {
          fieldValue
          totalCount
          nodes {
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              description
              slug
              draft
              author
            }
            id
            excerpt(truncate: true, pruneLength: 150)
          }
        }
      }
    }
  `)

  const { data: articleList, errors: err4 } = await graphql<Queries.Query>(`
    query allArticlesWithPublished {
      allMarkdownRemark(
        filter: { frontmatter: { draft: { ne: true } } }
        sort: { frontmatter: { date: DESC } }
      ) {
        totalCount
        edges {
          node {
            ...MarkdownRemarkFragment
          }
          next {
            ...MarkdownRemarkFragment
          }
          previous {
            ...MarkdownRemarkFragment
          }
        }
      }
    }

    fragment MarkdownRemarkFragment on MarkdownRemark {
      id
      tableOfContents
      timeToRead
      excerpt(pruneLength: 150, truncate: true)
      fields {
        slug
      }
      frontmatter {
        title
        author
        date(formatString: "MMMM DD, YYYY")
        original
        description
        draft
        slug
        categories
        series
        tags
      }
      headings {
        id
        value
        depth
      }
      wordCount {
        words
        sentences
        paragraphs
      }
      html
    }
  `)

  if (err1 || err2 || err3 || err4) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  createPage({
    path: `/articles`,
    component: path.resolve(`src/templates/articles.tsx`),
    context: {
      articles: {
        list: articleList?.allMarkdownRemark,
        groupBy: {
          categories: categoryNodes?.allMarkdownRemark.group,
          tags: tagNodes?.allMarkdownRemark.group,
          series: seriesNodes?.allMarkdownRemark.group,
        },
      },
      // This time the entire product is passed down as context
    },
  })

  articleList?.allMarkdownRemark.edges.forEach(({ node, next, previous }) => {
    createPage({
      path: `${node.fields?.slug}`,
      component: path.resolve(`src/templates/article.tsx`),
      context: {
        node,
        next,
        previous,
        // This time the entire product is passed down as context
      },
    })
  })
}

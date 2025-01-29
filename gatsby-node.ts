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

  const getArticleGroupQuery = (groupField: string) => `
    query allMarkdownRemarkGroupBy${groupField} {
      allMarkdownRemark(
        filter: {frontmatter: {draft: {ne: true}}}
        sort: {frontmatter: {date: DESC}}
      ) {
        group(field: {frontmatter: {${groupField.toLowerCase()}: SELECT}}) {
          totalCount
          field
          fieldValue
          edges {
            node {
              id
              fields {
                slug
              }
            }
          }
        }
      }
    }
    `

  const { data: categoryNodes, errors: categoryErrors } =
    await graphql<Queries.Query>(getArticleGroupQuery("Categories"))
  const { data: tagNodes, errors: tagErrors } = await graphql<Queries.Query>(
    getArticleGroupQuery("Tags"),
  )
  const { data: seriesNodes, errors: seriesErrors } =
    await graphql<Queries.Query>(getArticleGroupQuery("Series"))

  if (categoryErrors || tagErrors || seriesErrors) {
    console.log(categoryErrors || tagErrors || seriesErrors)
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  createPage({
    path: `/articles`,
    component: path.resolve(`src/templates/articles.tsx`),
    context: {
      _pathname: `/articles`,
      groupBy: {
        categories: categoryNodes?.allMarkdownRemark.group,
        tags: tagNodes?.allMarkdownRemark.group,
        series: seriesNodes?.allMarkdownRemark.group,
      },
    },
  })

  const { data: articleList, errors } = await graphql(`
    query ArticleList {
      allMarkdownRemark(
        filter: { frontmatter: { draft: { ne: true } } }
        sort: { frontmatter: { date: DESC } }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
          }
          next {
            id
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
          previous {
            id
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `)
  if (errors) {
    reporter.panicOnBuild("Error while running GraphQL query.")
    return
  }
  articleList.allMarkdownRemark.edges.forEach(({ node, next, previous }) => {
    createPage({
      path: `${node.fields?.slug}`,
      component: path.resolve(`src/templates/article.tsx`),
      context: {
        _pathname: `${node.fields?.slug}`,
        articleId: node.id,
        next,
        previous,
      },
    })
  })
}

export const onCreatePage: GatsbyNode["onCreatePage"] = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  deletePage(page)
  createPage({
    ...page,
    context: {
      ...page.context,
      _pathname: page.path,
    },
  })
}

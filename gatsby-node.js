const path = require("path")

exports.onCreateWebpackConfig = ({ _, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
      alias: { "@": path.resolve(__dirname, "src") },
    },
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent)
    createNodeField({
      node,
      name: `slug`,
      value: `/articles/${fileNode.name}`,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const { data: tagNode, errors: err1 } = await graphql(`
    query allArticle {
      allMarkdownRemark(
        filter: { frontmatter: { draft: { ne: true } } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        totalCount
        group(field: frontmatter___categories) {
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
  const { data: categoryNode, errors: err2 } = await graphql(`
    query allArticle {
      allMarkdownRemark(
        filter: { frontmatter: { draft: { ne: true } } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        totalCount
        group(field: frontmatter___tags) {
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
  const { data: seriesNode, errors: err3 } = await graphql(`
    query allArticle {
      allMarkdownRemark(
        filter: { frontmatter: { draft: { ne: true } } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        totalCount
        group(field: frontmatter___series) {
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

  const { data: articleList, errors: err4 } = await graphql(`
    query allArticle {
      allMarkdownRemark(
        filter: { frontmatter: { draft: { ne: true } } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
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
  `)

  if (err1 || err2 || err3 || err4) {
    console.error(err1, err2, err3, err4)
  }

  createPage({
    path: `/articles`,
    component: path.resolve(`src/templates/articles.tsx`),
    context: {
      groupBy: {
        all: articleList.allMarkdownRemark,
        categories: categoryNode.allMarkdownRemark.group,
        tags: tagNode.allMarkdownRemark.group,
        series: seriesNode.allMarkdownRemark.group,
      },
      // This time the entire product is passed down as context
    },
  })
}

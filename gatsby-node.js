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
      value: `/articles/${fileNode.name.toLowerCase()}`,
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
    query articleById1 {
      allMarkdownRemark(
        filter: { frontmatter: { draft: { ne: true } } }
        sort: { fields: frontmatter___date, order: DESC }
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
    console.error(err1, err2, err3, err4)
  }

  createPage({
    path: `/articles`,
    component: path.resolve(`./src/templates/articles.tsx`),
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

  articleList.allMarkdownRemark.edges.forEach(({ node, next, previous }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/article.tsx`),
      context: {
        node,
        next,
        previous,
        // This time the entire product is passed down as context
      },
    })
  })
}

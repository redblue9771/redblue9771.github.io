import { CreatePagesArgs, CreateWebpackConfigArgs } from "gatsby"
import path from "path"

export const onCreateWebpackConfig = ({
  _,
  actions,
}: CreateWebpackConfigArgs) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
      alias: { "@": path.resolve(__dirname, "src") },
    },
  })
}

export const createPages = async ({ graphql, actions }: CreatePagesArgs) => {
  const { createPage } = actions
  const { data: tagNode, errors: err1 } = await graphql(`
    query allTag {
      allMarkdownRemark {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `)
  const { data: categoryNode, errors: err2 } = await graphql(`
    query allCategory {
      allMarkdownRemark {
        group(field: frontmatter___categories) {
          fieldValue
        }
      }
    }
  `)
  const { data: seriesNode, errors: err3 } = await graphql(`
    query allSeries {
      allMarkdownRemark {
        group(field: frontmatter___series) {
          fieldValue
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

  const groupList = {
    categories: categoryNode.allMarkdownRemark.group,
    tags: tagNode.allMarkdownRemark.group,
    series: seriesNode.allMarkdownRemark.group,
  }

  const articlesByCategory = {}
  const _articleByCategory = []

  const articlesByTag = {}
  const _articleByTag = []
  const articlesBySeries = {}
  const _articleBySeries = []

  groupList.categories.forEach(({ fieldValue }) => {
    _articleByCategory.push(
      graphql(`
      query allArticle {
        allMarkdownRemark(
          filter: { frontmatter: { draft: { ne: true },categories: {in: "${fieldValue}"} } }
          sort: { fields: [frontmatter___date], order: DESC }
                  ) {
          totalCount
          nodes {
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
    )
  })

  groupList.tags.forEach(({ fieldValue }) => {
    _articleByTag.push(
      graphql(`
      query allArticle {
        allMarkdownRemark(
          filter: { frontmatter: { draft: { ne: true },tags: {in: "${fieldValue}"} } }
          sort: { fields: [frontmatter___date], order: DESC }
                  ) {
          totalCount
          nodes {
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
    )
  })
  groupList.series.forEach(({ fieldValue }) => {
    _articleBySeries.push(
      graphql(`
      query allArticle {
        allMarkdownRemark(
          filter: { frontmatter: { draft: { ne: true },series: {in: "${fieldValue}"} } }
          sort: { fields: [frontmatter___date], order: DESC }
                  ) {
          totalCount
          nodes {
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
    )
  })

  const _temp1 = await Promise.all(_articleByCategory)
  groupList.categories.forEach(({ fieldValue }, idx) => {
    articlesByCategory[fieldValue] = _temp1[idx].data.allMarkdownRemark
  })
  const _temp2 = await Promise.all(_articleByTag)
  groupList.tags.forEach(({ fieldValue }, idx) => {
    articlesByTag[fieldValue] = _temp2[idx].data.allMarkdownRemark
  })
  const _temp3 = await Promise.all(_articleBySeries)
  groupList.series.forEach(({ fieldValue }, idx) => {
    articlesBySeries[fieldValue] = _temp3[idx].data.allMarkdownRemark
  })

  if (err1 || err2 || err3 || err4) {
    console.error(err1, err2, err3, err4)
  }

  createPage({
    path: `/articles`,
    component: path.resolve(`src/templates/articles.tsx`),
    context: {
      groupList,
      groupBy: {
        articles: articleList.allMarkdownRemark,
        articlesByCategory,
        articlesByTag,
        articlesBySeries,
      },
      // This time the entire product is passed down as context
    },
  })
}

import Article, { IArticlePageQuery } from "@/templates/article"
import { graphql, PageProps } from "gatsby"
import React from "react"
import { MarkdownRemark } from "typings/graphql-types"

function MarkdownRemarkParentFileName(props: PageProps<IArticlePageQuery>) {
  return <Article {...props} />
}

export default MarkdownRemarkParentFileName

export const query = graphql`
  query articleById($id: String) {
    markdownRemark(id: { eq: $id }) {
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
  }
`

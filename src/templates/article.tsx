import { PageProps } from "gatsby"
import React from "react"
import { Col, Container, Row } from "react-bootstrap"
import { MarkdownRemark } from "typings/graphql-types"

// export const query = graphql`
//   query articleById($id: String) {
//     markdownRemark(id: { eq: $id }) {
//       id
//       tableOfContents
//       timeToRead
//       excerpt(pruneLength: 150, truncate: true)
//       fields {
//         slug
//       }
//       frontmatter {
//         title
//         author
//         date(formatString: "MMMM DD, YYYY")
//         original
//         description
//         draft
//         slug
//         categories
//         series
//         tags
//       }
//       headings {
//         id
//         value
//       }
//       wordCount {
//         words
//         sentences
//         paragraphs
//       }
//       html
//     }
//   }
// `

export interface IArticlePageQuery {
  markdownRemark: MarkdownRemark
}
function Article({ data, location }: PageProps<IArticlePageQuery>) {
  const { markdownRemark } = data
  const { frontmatter, fields } = markdownRemark

  console.log(location)
  return (
    <Container fluid="lg">
      <Row>
        <Col xs={12} lg={9}>
          <address>
            <table className="copyright">
              <tbody>
                <tr>
                  {frontmatter?.original ? (
                    <React.Fragment>
                      <td>协议</td>
                      <td>遵照原文使用协议，详情查看原文出处。</td>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <td>协议</td>
                      <td>
                        采用&nbsp;
                        <a
                          rel="license"
                          href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                          // eslint-disable-next-line react/jsx-no-target-blank
                          target="_blank"
                        >
                          <i className="bi bi-badge-cc" />
                          知识共享署名 - 非商业性使用 -
                          相同方式共享4.0国际许可协议
                        </a>
                        &nbsp;进行许可
                      </td>
                    </React.Fragment>
                  )}
                </tr>
                <tr>
                  <td>原文</td>
                  <td>
                    {frontmatter?.original === "来自互联网" ? (
                      frontmatter?.original
                    ) : (
                      <a
                        href={
                          frontmatter?.original ||
                          location.origin + location.pathname
                        }
                        target="_blank"
                        rel="noopener noreferrer copyright"
                      >
                        {frontmatter?.original ||
                          location.origin + location.pathname}
                      </a>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>作者</td>
                  <td>{frontmatter?.author}</td>
                </tr>
                {Array.isArray(frontmatter?.tags) && (
                  <tr>
                    <td>标签</td>
                    <td>{frontmatter?.tags?.join("、")}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </address>
          {/* 
        <div className="divider d-none d-md-block">
          <span />
          <span>📖 正文</span>
          <span />
        </div>
        <article id="blog-article">{parse(_html)}</article>
        <p>（完）</p>
        <div className="divider">
          <span />
          <span>🙋 评论</span>
          <span />
        </div> */}
          {/* <div ref={commentRef} className="comment" /> */}

          <article
            dangerouslySetInnerHTML={{
              __html: data?.markdownRemark?.html ?? "ERR: HTML Render Error!",
            }}
            style={{ overflow: "hidden" }}
          />
        </Col>
        <Col xs={12} lg={3}>
          <aside
            className="sticky-md-top"
            style={{ top: "4rem" }}
            dangerouslySetInnerHTML={{
              __html:
                data?.markdownRemark?.tableOfContents ??
                "ERR: HTML Render Error!",
            }}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default Article

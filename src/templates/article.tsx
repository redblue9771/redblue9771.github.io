import { Divider, SEO } from "@/components"
import { useHeaderMetadataContext } from "@/features/layouts"
import { graphql, Link, PageProps } from "gatsby"

import "katex/dist/katex.min.css"
import "prismjs/themes/prism-tomorrow.css"
import { Fragment, useEffect, useRef } from "react"
import { Col, Container, Row, Table } from "react-bootstrap"
export const Head = ({ data: { markdownRemark } }: PageProps) => (
  <SEO title={markdownRemark.frontmatter?.title ?? ""} />
)

export const query = graphql`
  query ArticleById($articleId: String!) {
    markdownRemark(id: { eq: $articleId }) {
      frontmatter {
        author
        date(formatString: "yyyy-MM-DD")
        description
        series
        tags
        title
        original
      }
      html
      id
      tableOfContents
      timeToRead
      wordCount {
        words
      }
    }
  }
`

function Article({
  pageContext,
  location,
  data: { markdownRemark },
}: PageProps) {
  const { setHeaderMetadata } = useHeaderMetadataContext()

  const { next, previous } = pageContext
  const { frontmatter } = markdownRemark
  console.log({ markdownRemark })
  useEffect(() => {
    setHeaderMetadata(() => ({
      title: frontmatter?.title ?? "",
      subTitle: frontmatter?.description ?? "",
      description: frontmatter?.date ?? "",
    }))
  }, [])

  const commentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const commentScript = document.createElement("script")
    commentScript.async = true
    commentScript.src = "https://utteranc.es/client.js"
    commentScript.setAttribute("repo", "redblue9771/comments-for-redblue") // PLEASE CHANGE THIS TO YOUR REPO
    commentScript.setAttribute("issue-term", "url")
    commentScript.setAttribute("id", "utterances")
    commentScript.setAttribute("theme", "github-light")
    commentScript.setAttribute("crossorigin", "anonymous")
    commentScript.setAttribute("label", "comment")

    if (commentRef && commentRef.current) {
      commentRef?.current.appendChild(commentScript)
    } else {
      console.log(`Error adding utterances comments on: ${commentRef}`)
    }
  }, [commentRef])

  return (
    <Container fluid="lg" as={Row} className="mx-auto px-1">
      <Col xs={12} lg={9}>
        {/* <address>
          <Table striped bordered hover size="sm">
            <tbody>
              <tr>
                {frontmatter?.original ? (
                  <Fragment>
                    <td>协议</td>
                    <td>遵照原文使用协议，详情查看原文出处。</td>
                  </Fragment>
                ) : (
                  <Fragment>
                    <td>协议</td>
                    <td>
                      采用&nbsp;
                      <a
                        rel="license noopener noreferrer"
                        href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                        target="_blank"
                      >
                        <i className="bi bi-badge-cc" />
                        知识共享署名 - 非商业性使用 -
                        相同方式共享4.0国际许可协议
                      </a>
                      &nbsp;进行许可
                    </td>
                  </Fragment>
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
          </Table>
        </address> */}
        <address>
          {frontmatter?.original ? (
            <div>
              <small className="text-muted">转自：</small>
              <a
                href={frontmatter.original}
                target="_blank"
                rel="noopener noreferrer copyright"
                title={frontmatter.original}
              >
                {frontmatter.author}
              </a>
            </div>
          ) : (
            <div>
              <a
                rel="license noopener noreferrer"
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                target="_blank"
                title="知识共享署名 - 非商业性使用 - 相同方式共享4.0国际许可协议"
              >
                <i className="bi bi-cc-circle" /> 赤琦
              </a>{" "}
              <small className="text-muted">原创于</small>{" "}
              <time dateTime="YYYY-MM-DD">{frontmatter.date}</time>
            </div>
          )}
          <div>
            <small className="text-muted">全文</small>{" "}
            {markdownRemark.wordCount.words}{" "}
            <small className="text-muted">字，阅完预估</small>{" "}
            {markdownRemark.timeToRead}{" "}
            <small className="text-muted">分钟</small>
          </div>
        </address>
        <Divider>📖 正文</Divider>
        <article
          dangerouslySetInnerHTML={{
            __html: markdownRemark?.html ?? "ERR: HTML Render Error!",
          }}
          style={{ overflow: "hidden" }}
        />
        <p>（完）</p>
        <Divider>🙋 评论</Divider>
        <div ref={commentRef} className="comment" />
      </Col>
      <Col xs={12} lg={3}>
        <aside className="article-aside sticky-md-top">
          <Divider>📚 目录</Divider>
          <nav
            className="tableOfContents"
            dangerouslySetInnerHTML={{
              __html:
                markdownRemark?.tableOfContents ?? "ERR: HTML Render Error!",
            }}
          />
          <Divider>🧐 更多</Divider>
          {previous && (
            <small>
              <span>上一篇：</span>
              <Link
                to={previous?.fields?.slug ?? ""}
                rel="prev"
                className="d-block"
              >
                {previous?.frontmatter?.title}
              </Link>
            </small>
          )}

          {next && (
            <small>
              <span>下一篇：</span>
              <Link
                to={next?.fields?.slug ?? ""}
                rel="next"
                className="d-block"
              >
                {next?.frontmatter?.title}
              </Link>
            </small>
          )}
        </aside>
      </Col>
    </Container>
  )
}

export default Article

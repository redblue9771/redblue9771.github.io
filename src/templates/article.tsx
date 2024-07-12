import { Divider, SEO } from "@/components"
import { useSiteMetadataContext } from "@/features/layouts"
import { Link, PageProps } from "gatsby"

import "katex/dist/katex.min.css"
import "prismjs/themes/prism-tomorrow.css"
import { Fragment, useEffect, useRef } from "react"
import { Col, Container, Row } from "react-bootstrap"
export const Head = ({ pageContext }: PageProps<null, ArticleByIdQuery>) => (
  <SEO title={pageContext?.node?.frontmatter?.title ?? ""} />
)
export type MarkdownRemarkFragmentFragment = Pick<
  Queries.MarkdownRemark,
  "id" | "tableOfContents" | "timeToRead" | "excerpt" | "html"
> & {
  fields?: Queries.Maybe<Pick<Queries.MarkdownRemarkFields, "slug">>
  frontmatter?: Queries.Maybe<
    Pick<
      Queries.MarkdownRemarkFrontmatter,
      | "title"
      | "author"
      | "date"
      | "original"
      | "description"
      | "draft"
      | "slug"
      | "categories"
      | "series"
      | "tags"
    >
  >
  headings?: Queries.Maybe<
    Array<
      Queries.Maybe<Pick<Queries.MarkdownHeading, "id" | "value" | "depth">>
    >
  >
  wordCount?: Queries.Maybe<
    Pick<Queries.MarkdownWordCount, "words" | "sentences" | "paragraphs">
  >
}
export type ArticleByIdQuery = {
  node: MarkdownRemarkFragmentFragment
  next?: Queries.Maybe<MarkdownRemarkFragmentFragment>
  previous?: Queries.Maybe<MarkdownRemarkFragmentFragment>
}

function Article({ pageContext, location }: PageProps<null, ArticleByIdQuery>) {
  const { setMetadata } = useSiteMetadataContext()

  const { node, next, previous } = pageContext
  const { frontmatter } = node

  useEffect(() => {
    setMetadata(() => ({
      author: null,
      siteUrl: null,
      title: frontmatter?.title ?? "",
      subTitle: frontmatter?.title ?? "",
      description: frontmatter?.description ?? "",
      date: frontmatter?.date ?? "",
    }))
  }, [frontmatter])

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
        <address>
          <table className="copyright">
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
          </table>
        </address>

        <Divider>📖 正文</Divider>
        <article
          dangerouslySetInnerHTML={{
            __html: node?.html ?? "ERR: HTML Render Error!",
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
              __html: node?.tableOfContents ?? "ERR: HTML Render Error!",
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

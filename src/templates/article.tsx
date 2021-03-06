import { Divider } from "@/components"
import { Link, PageProps } from "gatsby"
import React from "react"
import { Col, Container, Row } from "react-bootstrap"
import {
  MarkdownHeading,
  MarkdownRemark,
  MarkdownRemarkFields,
  MarkdownRemarkFrontmatter,
  MarkdownWordCount,
  Maybe,
} from "typings/graphql-types"
import { SiteMetadata } from "./main.layout"
import "katex/dist/katex.min.css"
import "prismjs/themes/prism-tomorrow.css"

export type MarkdownRemarkFragmentFragment = Pick<
  MarkdownRemark,
  "id" | "tableOfContents" | "timeToRead" | "excerpt" | "html"
> & {
  fields?: Maybe<Pick<MarkdownRemarkFields, "slug">>
  frontmatter?: Maybe<
    Pick<
      MarkdownRemarkFrontmatter,
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
  headings?: Maybe<
    Array<Maybe<Pick<MarkdownHeading, "id" | "value" | "depth">>>
  >
  wordCount?: Maybe<
    Pick<MarkdownWordCount, "words" | "sentences" | "paragraphs">
  >
}
export type ArticleByIdQuery = {
  node: MarkdownRemarkFragmentFragment
  next?: Maybe<MarkdownRemarkFragmentFragment>
  previous?: Maybe<MarkdownRemarkFragmentFragment>
}

function Article({
  pageContext,
  location,
  ...props
}: PageProps<null, ArticleByIdQuery>) {
  console.log(pageContext)
  const { setMetadata } = React.useContext(SiteMetadata)

  const { node, next, previous } = pageContext
  const { frontmatter, fields } = node

  React.useEffect(() => {
    setMetadata(prev => ({
      ...prev,
      title: frontmatter?.title,
      subTitle: frontmatter?.title,
      description: frontmatter?.description,
      date: frontmatter?.date,
    }))
  }, [frontmatter])

  const commentRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
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
    <Container fluid="lg" as={Row} className="mx-auto">
      <Col xs={12} lg={9}>
        <address>
          <table className="copyright">
            <tbody>
              <tr>
                {frontmatter?.original ? (
                  <React.Fragment>
                    <td>??????</td>
                    <td>??????????????????????????????????????????????????????</td>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <td>??????</td>
                    <td>
                      ??????&nbsp;
                      <a
                        rel="license"
                        href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                        // eslint-disable-next-line react/jsx-no-target-blank
                        target="_blank"
                      >
                        <i className="bi bi-badge-cc" />
                        ?????????????????? - ?????????????????? -
                        ??????????????????4.0??????????????????
                      </a>
                      &nbsp;????????????
                    </td>
                  </React.Fragment>
                )}
              </tr>
              <tr>
                <td>??????</td>
                <td>
                  {frontmatter?.original === "???????????????" ? (
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
                <td>??????</td>
                <td>{frontmatter?.author}</td>
              </tr>
              {Array.isArray(frontmatter?.tags) && (
                <tr>
                  <td>??????</td>
                  <td>{frontmatter?.tags?.join("???")}</td>
                </tr>
              )}
            </tbody>
          </table>
        </address>

        <Divider>???? ??????</Divider>
        <article
          dangerouslySetInnerHTML={{
            __html: node?.html ?? "ERR: HTML Render Error!",
          }}
          style={{ overflow: "hidden" }}
        />
        <p>?????????</p>
        <Divider>???? ??????</Divider>
        <div ref={commentRef} className="comment" />
      </Col>
      <Col xs={12} lg={3}>
        <aside className="article-aside sticky-md-top">
          <Divider>???? ??????</Divider>
          <nav
            className="tableOfContents"
            dangerouslySetInnerHTML={{
              __html: node?.tableOfContents ?? "ERR: HTML Render Error!",
            }}
          />
          <Divider>???? ??????</Divider>
          {previous && (
            <small>
              <span>????????????</span>
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
              <span>????????????</span>
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

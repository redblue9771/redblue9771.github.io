import { Timeline, TimelineItem } from "@/components"
import { SiteMetadata } from "@/templates/main.layout"
import React from "react"
import { Container } from "react-bootstrap"
import { GistConnection, ViewerHovercardContext } from "typings/schemas"

function Repositories() {
  const { setMetadata } = React.useContext(SiteMetadata)

  const [repo, setRepo] = React.useState<
    NonNullable<ViewerHovercardContext["viewer"]["repositories"]["nodes"]>
  >([])
  const [gist, setGist] = React.useState<NonNullable<GistConnection["nodes"]>>(
    []
  )

  React.useEffect(() => {
    setMetadata(prev => ({
      title: "项目",
      subTitle: "吾与徐工孰娴编码之技",
      description: "Talk is cheap. Show me the code.",
    }))
  }, [])

  React.useEffect(() => {
    fetch("https://api.github.com/graphql", {
      method: "POST",
      body: JSON.stringify({
        query: `
        {
          viewer {
            repositories(privacy: PUBLIC, isFork: false, first: 99, orderBy: {field: UPDATED_AT, direction: DESC}) {
              nodes {
                id
                name
                createdAt
                pushedAt
                updatedAt
                url
                forkCount
                licenseInfo {
                  name
                  id
                }
                primaryLanguage {
                  name
                  id
                  color
                }
                homepageUrl
                description
                stargazerCount
                commitComments(last: 1) {
                  nodes {
                    commit {
                      author {
                        name
                      }
                      message
                    }
                  }
                }
              }
            }
            gists(privacy: PUBLIC, first: 99, orderBy: {field: UPDATED_AT, direction: DESC}) {
              nodes {
                id
                description
                updatedAt
                url
              }
            }
          }
        }        
    `,
      }),
      headers: {
        Authorization: `bearer ${process.env.GATSBY_GITHUB_TOKEN}`,
      },
    })
      .then(res => res.json())
      .then(res => {
        setRepo(res?.data?.viewer?.repositories?.nodes ?? [])
        setGist(res?.data?.viewer?.gists?.nodes ?? [])
      })
  }, [])

  return (
    <Container fluid="lg" className="mx-auto">
      <h3>
        <a
          href="https://github.com/redblue9771"
          target="_blank"
          rel="noreferrer noopener"
        >
          💻 Repositories
        </a>
      </h3>
      <Timeline>
        {repo.length === 0 && (
          <TimelineItem
            header={
              <h5>
                <strong className="masked">
                  🏃‍♂️ 从 github.com/redblue9771 拉取中…
                </strong>
              </h5>
            }
            point={<i className="bi bi-cpu" />}
          />
        )}
        {repo.map(
          ({
            id,
            name,
            description,
            createdAt,
            pushedAt,
            updatedAt,
            url,
            forkCount,
            stargazerCount: starCount,
            commitComments,
            licenseInfo,
            primaryLanguage,
            homepageUrl,
          }) => (
            <TimelineItem
              key={id}
              header={
                <React.Fragment>
                  <h5 className="d-inline-block">{name}</h5>
                  <div>
                    <small>
                      <span>
                        <i className="bi bi-code-slash" />
                        {primaryLanguage ? primaryLanguage.name : ""}
                      </span>
                      &nbsp;&nbsp;&nbsp;
                      <span>
                        <i className="bi bi-star" />
                        {starCount}
                      </span>
                      &nbsp;&nbsp;&nbsp;
                      <span>
                        <i className="bi bi-bezier2" />
                        {forkCount}
                      </span>
                      &nbsp;&nbsp;&nbsp;
                      {licenseInfo && (
                        <span>
                          <i className="bi bi-book-half" />
                          {licenseInfo.name}
                        </span>
                      )}
                    </small>
                  </div>
                </React.Fragment>
              }
              body={
                <React.Fragment>
                  <p>{description}</p>
                  {commitComments?.nodes?.[0] && (
                    <small className="d-block">
                      最新的提交：
                      {commitComments?.nodes?.[0]?.commit?.message} by{" "}
                      {commitComments?.nodes?.[0]?.commit?.author?.name}
                    </small>
                  )}
                </React.Fragment>
              }
              footer={
                <p>
                  <small>
                    最近一次更新：
                    {new Date(updatedAt).toLocaleDateString()}
                  </small>
                </p>
              }
              point={<i className="bi bi-cpu" />}
            />
          )
        )}
      </Timeline>

      <h3>
        <a
          href="https://gist.github.com/redblue9771"
          target="_blank"
          rel="noreferrer noopener"
        >
          🏷️ Gist
        </a>
      </h3>

      <ul>
        {gist.map(({ id, description, updatedAt, url }) => (
          <li key={id}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              title={description}
            >
              {new Date(updatedAt).toLocaleDateString()} - {description}
            </a>
          </li>
        ))}
      </ul>
    </Container>
  )
}

export default Repositories

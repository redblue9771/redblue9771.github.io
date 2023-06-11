import { SEO, Timeline, TimelineItem } from "@/components"
import { useSiteMetadataContext } from "@/features/layouts"

import type { Gist, Repository } from "@/typings/github.schemas"
import { Fragment, useEffect, useState } from "react"

import { Container } from "react-bootstrap"
export const Head = () => <SEO title="项目" />
function Repositories() {
  const { setMetadata } = useSiteMetadataContext()

  const [repositories, setRepositories] = useState<Repository[]>([])
  const [gists, setGists] = useState<Gist[]>([])

  useEffect(() => {
    setMetadata(() => ({
      author: null,
      siteUrl: null,
      date: null,
      title: "项目",
      subTitle: "吾与徐工孰娴编码之技",
      description: "Talk is cheap. Show me the code.",
    }))
  }, [])

  useEffect(() => {
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
        setRepositories(res?.data?.viewer?.repositories?.nodes ?? [])
        setGists(res?.data?.viewer?.gists?.nodes ?? [])
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
        {repositories.length === 0 && (
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
        {repositories.map(
          ({
            id,
            name,
            description,
            updatedAt,
            forkCount,
            stargazerCount: starCount,
            commitComments,
            licenseInfo,
            primaryLanguage,
          }) => (
            <TimelineItem
              key={id}
              header={
                <Fragment>
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
                </Fragment>
              }
              body={
                <Fragment>
                  <p>{description}</p>
                  {commitComments?.nodes?.[0] && (
                    <small className="d-block">
                      最新的提交：
                      {commitComments?.nodes?.[0]?.commit?.message} by{" "}
                      {commitComments?.nodes?.[0]?.commit?.author?.name}
                    </small>
                  )}
                </Fragment>
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
        {gists.map(({ id, description, updatedAt, url }) => (
          <li key={id}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              title={description ?? ""}
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

import { useEffect, useState } from "react"

interface Repository {
  id: number
  name: string
  html_url: string
  description: string | null
  updated_at: string
  stargazers_count: number
  forks_count: number
  language: string | null
  fork: boolean
}

interface Gist {
  id: string
  html_url: string
  description: string | null
  updated_at: string
}

interface GithubData {
  repositories: Repository[]
  gists: Gist[]
}

function useGithubData(username: string) {
  const [data, setData] = useState<GithubData>({ repositories: [], gists: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>()

  useEffect(() => {
    const controller = new AbortController()
    const load = async () => {
      try {
        const [repositoriesResponse, gistsResponse] = await Promise.all([
          fetch(
            `https://api.github.com/users/${encodeURIComponent(username)}/repos?type=owner&sort=updated&per_page=100`,
            { signal: controller.signal },
          ),
          fetch(
            `https://api.github.com/users/${encodeURIComponent(username)}/gists?per_page=100`,
            { signal: controller.signal },
          ),
        ])
        if (!repositoriesResponse.ok || !gistsResponse.ok) {
          const response = !repositoriesResponse.ok
            ? repositoriesResponse
            : gistsResponse
          throw new Error(
            `GitHub API returned ${response.status} ${response.statusText}`,
          )
        }
        const [repositories, gists] = await Promise.all([
          repositoriesResponse.json() as Promise<Repository[]>,
          gistsResponse.json() as Promise<Gist[]>,
        ])
        setData({
          repositories: repositories.filter(repository => !repository.fork),
          gists,
        })
      } catch (cause) {
        if (cause instanceof DOMException && cause.name === "AbortError") return
        setError(cause instanceof Error ? cause.message : "未知错误")
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }
    void load()
    return () => controller.abort()
  }, [username])

  return { ...data, loading, error }
}

function LoadingMessage() {
  return (
    <p className="text-slate-600 dark:text-slate-300" role="status">
      正在从 GitHub 获取公开项目…
    </p>
  )
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <p
      className="rounded bg-amber-50 p-3 text-sm text-amber-950 dark:bg-amber-950 dark:text-amber-100"
      role="status"
    >
      暂时无法加载 GitHub 数据：{message}
    </p>
  )
}

export function HomeGithubWidget({
  username,
  title,
}: {
  username: string
  title: string
}) {
  const { repositories, loading, error } = useGithubData(username)
  return (
    <section
      class="min-w-0 min-h-[22.25rem] bg-white px-[1.4rem] py-4 text-slate-900 dark:bg-slate-800 dark:text-slate-100 text-center"
      aria-labelledby="home-projects-title"
    >
      <h2 id="home-projects-title" className="mb-4 text-xl font-semibold">
        {title}
      </h2>
      {loading && <LoadingMessage />}
      {error && <ErrorMessage message={error} />}
      {!loading &&
        !error &&
        repositories.slice(0, 5).map(repository => (
          <a
            key={repository.id}
            href={repository.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-3 block rounded px-2 py-1 text-gray no-underline hover:bg-gray/10 hover:text-gray"
            //mb-3 block truncate rounded px-2 py-1 text-white no-underline hover:bg-white/10 hover:text-white
          >
            <span className="block truncate font-medium">
              {repository.name}
            </span>
            <span className="block truncate text-sm text-gray/75">
              {repository.description || "No Description"}
            </span>
          </a>
        ))}
      {!loading && !error && repositories.length === 0 && (
        <p className="text-gray/80">没有找到公开项目。</p>
      )}
    </section>
  )
}

export default function GithubRepositories({ username }: { username: string }) {
  const { repositories, gists, loading, error } = useGithubData(username)
  return (
    <>
      <section aria-labelledby="repositories-title">
        <h2 id="repositories-title" className="mb-4 text-2xl font-semibold">
          <a
            href={`https://github.com/${encodeURIComponent(username)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            💻 Repositories
          </a>
        </h2>
        {loading && <LoadingMessage />}
        {error && <ErrorMessage message={error} />}
        <div className="grid gap-4 min-[768px]:grid-cols-2 min-[992px]:grid-cols-3">
          {repositories.map(repository => (
            <a
              key={repository.id}
              href={repository.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group min-w-0 rounded-lg border border-slate-200 p-4 text-inherit no-underline transition-shadow hover:shadow-lg dark:border-slate-700 dark:hover:shadow-slate-900"
            >
              <h3 className="truncate text-lg font-semibold text-slate-900 group-hover:text-primary dark:text-slate-100 dark:group-hover:text-blue-300">
                ◈ {repository.name}
              </h3>
              <p className="my-2 truncate text-sm text-slate-600 dark:text-slate-300">
                {repository.description || "-"}
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                <span>★ {repository.stargazers_count}</span>
                <span>⑂ {repository.forks_count}</span>
                <span>{repository.language || "未注明语言"}</span>
                <time dateTime={repository.updated_at}>
                  {new Date(repository.updated_at).toLocaleDateString()}
                </time>
              </div>
            </a>
          ))}
        </div>
      </section>
      <section aria-labelledby="gists-title" className="mt-10">
        <h2 id="gists-title" className="mb-3 text-2xl font-semibold">
          <a
            href={`https://gist.github.com/${encodeURIComponent(username)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            🏷️ Gist
          </a>
        </h2>
        {loading && <LoadingMessage />}
        {!loading && !error && (
          <ul className="list-inside list-disc space-y-2">
            {gists.map(gist => (
              <li key={gist.id}>
                <a
                  href={gist.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={gist.description || "GitHub Gist"}
                >
                  {new Date(gist.updated_at).toLocaleDateString()} -{" "}
                  {gist.description || "未命名 Gist"}
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  )
}

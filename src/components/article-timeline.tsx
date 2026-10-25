export interface ArticleListItem {
  id: string
  title: string
  author: string
  date: string
  href: string
  description: string
}

interface ArticleTimelineProps {
  articles: ArticleListItem[]
}

export default function ArticleTimeline({ articles }: ArticleTimelineProps) {
  if (articles.length === 0) {
    return (
      <p className="rounded-lg bg-slate-100 p-6 text-center text-slate-600 dark:bg-slate-800 dark:text-slate-300">
        暂无已发布的博文。
      </p>
    )
  }

  return (
    <ol
      aria-label="博文时间线"
      className="relative my-8 w-full py-[60px] before:absolute before:bottom-0 before:left-1/2 before:top-0 before:w-px before:bg-slate-300 before:content-[''] dark:before:bg-slate-700 max-md:pl-5 max-md:before:left-5"
    >
      <span
        aria-hidden="true"
        className="box-content absolute left-1/2 top-1.5 size-[11px] -translate-x-1/2 rotate-45 border-[5px] border-white bg-slate-300 shadow-[0_0_0_2px_#cfcdcd] dark:border-slate-950 dark:bg-slate-500 dark:shadow-[0_0_0_2px_#64748b] max-md:left-5"
      />
      {articles.map((article, index) => {
        const even = index % 2 === 1
        return (
          <li
            key={article.id}
            className={`group relative block w-1/2 after:absolute after:top-[28px] after:w-[14%] after:border-t after:border-slate-300 after:content-[''] dark:after:border-slate-700 ${even ? "ml-auto after:left-0" : "after:right-0"} max-md:ml-0 max-md:w-full max-md:pl-[42px] max-md:after:left-0 max-md:after:right-auto max-md:after:w-[32px]`}
          >
            <span
              aria-hidden="true"
              className={`absolute top-[16px] z-10 size-6 rotate-45 border border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-950 ${even ? "left-[-12px]" : "right-[-12px]"} max-md:right-auto max-md:left-[-12px]`}
            >
              <span className="absolute left-1/2 top-1/2 size-[14px] -translate-x-1/2 -translate-y-1/2 bg-white transition-colors group-hover:bg-sky-400 dark:bg-slate-950 dark:group-hover:bg-sky-500" />
            </span>
            <a
              href={article.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative block w-[84%] border border-transparent px-[30px] py-[18px] no-underline transition-all hover:border-slate-300 dark:hover:border-slate-700 ${even ? "ml-auto text-left" : "text-right"} max-md:ml-0 max-md:w-full max-md:text-left`}
            >
              <span
                aria-hidden="true"
                className={`box-content absolute top-[20px] size-[14px] rotate-45 border border-slate-300 bg-white transition-colors group-hover:border-sky-400 group-hover:bg-sky-400 dark:border-slate-600 dark:bg-slate-950 ${even ? "left-[-8px]" : "right-[-8px]"} max-md:right-auto max-md:left-[-8px]`}
              />
              <time className="mb-2 block text-[15px] font-semibold text-sky-400 transition-colors group-hover:text-slate-700 dark:text-sky-300 dark:group-hover:text-slate-200">
                {article.author} {article.date}
              </time>
              <h2 className="text-lg font-normal text-slate-700 transition-colors group-hover:text-sky-500 dark:text-slate-200 dark:group-hover:text-sky-300">
                {article.title}
              </h2>
              <p className="mt-2 text-base leading-7 text-slate-500 dark:text-slate-400">
                {article.description}
              </p>
            </a>
          </li>
        )
      })}
      <span
        aria-hidden="true"
        className="box-content absolute bottom-1.5 left-1/2 size-[11px] -translate-x-1/2 rotate-45 border-[5px] border-white bg-slate-300 shadow-[0_0_0_2px_#cfcdcd] dark:border-slate-950 dark:bg-slate-500 dark:shadow-[0_0_0_2px_#64748b] max-md:left-5"
      />
    </ol>
  )
}

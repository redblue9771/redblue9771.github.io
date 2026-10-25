import { siteConfig } from "./site"

const environmentBoolean = (
  name: string,
  value: string | undefined,
  fallback: boolean,
) => {
  if (value === undefined) return fallback
  if (value === "true") return true
  if (value === "false") return false
  throw new Error(`${name} must be either "true" or "false".`)
}

export const integrations = {
  githubUsername:
    import.meta.env.PUBLIC_GITHUB_USERNAME?.trim() ||
    siteConfig.social.githubUsername,
  googleAnalyticsId: import.meta.env.PUBLIC_GOOGLE_ANALYTICS_ID,
  vercelAnalytics: environmentBoolean(
    "PUBLIC_VERCEL_ANALYTICS_ENABLED",
    import.meta.env.PUBLIC_VERCEL_ANALYTICS_ENABLED,
    true,
  ),
  vercelSpeedInsights: environmentBoolean(
    "PUBLIC_VERCEL_SPEED_INSIGHTS_ENABLED",
    import.meta.env.PUBLIC_VERCEL_SPEED_INSIGHTS_ENABLED,
    true,
  ),
  utterances: {
    repository:
      import.meta.env.PUBLIC_UTTERANCES_REPOSITORY ??
      "redblue9771/comments-for-redblue",
    issueTerm: import.meta.env.PUBLIC_UTTERANCES_ISSUE_TERM ?? "url",
    label: import.meta.env.PUBLIC_UTTERANCES_LABEL ?? "comment",
  },
} as const

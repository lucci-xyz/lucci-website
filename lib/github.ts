export type LucciRepository = {
  name: string
  description: string
  language: string | null
  stars: number
  updatedAt: string
  url: string
  homepage: string | null
}

const hiddenRepositoryNames = new Set([
  ".github",
  "flex-pay",
  "lucci-website",
  "skill-format-vscode",
  "stablecoin-acceptance-ledger",
])

const fallbackRepositories: LucciRepository[] = []

export async function getLucciRepositories(): Promise<LucciRepository[]> {
  try {
    const response = await fetch(
      "https://api.github.com/orgs/lucci-xyz/repos?type=public&sort=updated&per_page=24",
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
        },
        next: { revalidate: 3600 },
      },
    )

    if (!response.ok) return fallbackRepositories

    const repositories = (await response.json()) as Array<{
      name: string
      description: string | null
      language: string | null
      stargazers_count: number
      updated_at: string
      html_url: string
      homepage: string | null
      fork: boolean
      archived: boolean
      private: boolean
      visibility: "public" | "private" | "internal"
    }>

    return repositories
      .filter(
        (repository) =>
          repository.private === false &&
          repository.visibility === "public" &&
          !repository.fork &&
          !repository.archived &&
          !hiddenRepositoryNames.has(repository.name.toLowerCase()),
      )
      .map((repository) => ({
        name: repository.name,
        description: repository.description?.trim() || "An open-source experiment from Lucci Labs.",
        language: repository.language,
        stars: repository.stargazers_count,
        updatedAt: repository.updated_at,
        url: repository.html_url,
        homepage: repository.homepage,
      }))
  } catch {
    return fallbackRepositories
  }
}

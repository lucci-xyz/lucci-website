import type { Metadata } from "next"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { getLucciRepositories } from "@/lib/github"

export const metadata: Metadata = {
  title: "Building",
  description: "Open-source instruments built in the course of Lucci Labs research.",
}

export const revalidate = 3600

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(value))
}

export default async function BuildingPage() {
  const repositories = await getLucciRepositories()

  return (
    <div className="shell" id="top">
      <SiteHeader />
      <main className="index-page">
        <section className="page-hero">
          <p className="eyebrow">Building</p>
          <h1>Instruments built in the course of the research.</h1>
          <p className="page-hero-copy">
            Open-source systems built to test the ideas in the writing. This page gives the
            context and intent; GitHub remains the source of truth for code, releases, and
            contribution history.
          </p>
        </section>

        <section className="index-list" aria-label="Open-source projects, most recently updated first">
          {repositories.map((repository) => (
            <article className="index-entry" key={repository.name}>
              <p className="index-date">{formatDate(repository.updatedAt)}<br />{repository.language || "Multiple"}</p>
              <div>
                <h2 className="index-title">
                  <a href={repository.url} target="_blank" rel="noreferrer">
                    {repository.name}<span className="arrow">↗</span>
                  </a>
                </h2>
                <p className="index-desc">{repository.description}</p>
                <p className="index-meta">
                  {repository.stars > 0 && <span>{repository.stars} {repository.stars === 1 ? "star" : "stars"}</span>}
                  {repository.homepage && (
                    <a href={repository.homepage} target="_blank" rel="noreferrer">Open project ↗</a>
                  )}
                </p>
              </div>
            </article>
          ))}
          {repositories.length === 0 && (
            <p className="project-empty">
              Projects sync from GitHub hourly. See{" "}
              <a className="quiet-link" href="https://github.com/lucci-xyz" target="_blank" rel="noreferrer">github.com/lucci-xyz</a>{" "}
              for the current list.
            </p>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

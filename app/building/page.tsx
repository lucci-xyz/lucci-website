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

        <section className="project-list" aria-label="Open-source projects">
          {repositories.map((repository) => (
            <article className="project-entry" key={repository.name}>
              <h2 className="project-name">{repository.name}</h2>
              <p className="project-desc">{repository.description}</p>
              <div className="project-links">
                <a href={repository.url} target="_blank" rel="noreferrer">View source ↗</a>
                {repository.homepage && <a href={repository.homepage} target="_blank" rel="noreferrer">Open project ↗</a>}
              </div>
              <dl className="project-specs" aria-label={`${repository.name} at a glance`}>
                <div>
                  <dt>Language</dt>
                  <dd>{repository.language || "Multiple"}</dd>
                </div>
                <div>
                  <dt>Stars</dt>
                  <dd>{repository.stars}</dd>
                </div>
                <div>
                  <dt>Updated</dt>
                  <dd>{formatDate(repository.updatedAt)}</dd>
                </div>
              </dl>
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

import type { Metadata } from "next"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { getLucciRepositories } from "@/lib/github"

export const metadata: Metadata = {
  title: "Projects",
  description: "Open-source projects and experiments from Lucci Labs.",
}

export const revalidate = 3600

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(value))
}

export default async function ProjectsPage() {
  const repositories = await getLucciRepositories()
  return (
    <div className="shell" id="top">
      <SiteHeader />
      <main>
        <section className="page-hero">
          <p className="eyebrow">Projects</p>
          <div className="page-hero-row">
            <div>
              <h1>Tools made while investigating the work.</h1>
              <p className="page-hero-copy">The site provides the context. GitHub remains the source of truth for code, releases, issues, and contribution history.</p>
            </div>
            <p className="page-count">Synced from GitHub<br />Hourly</p>
          </div>
        </section>

        <section className="project-list" aria-label="Lucci Labs projects">
          {repositories.map((repository, index) => (
            <article className="project-entry" key={repository.name}>
              <div>
                <p className="eyebrow">{String(index + 1).padStart(2, "0")} / Open source</p>
                <h2 className="project-name">{repository.name}</h2>
              </div>
              <div className="project-side">
                <p className="project-desc">{repository.description}</p>
                <div className="project-meta">
                  <span>{repository.language || "Multiple languages"}</span>
                  <span>Updated {formatDate(repository.updatedAt)}</span>
                  <span>{repository.stars} stars</span>
                </div>
                <div className="project-links">
                  <a href={repository.url} target="_blank" rel="noreferrer">View source ↗</a>
                  {repository.homepage && <a href={repository.homepage} target="_blank" rel="noreferrer">Open project ↗</a>}
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="page-note">
          <h2>Project pages</h2>
          <div className="page-note-copy">
            <p>Only projects that need explanation beyond a README receive a dedicated page here.</p>
            <p>Repository metadata is refreshed automatically from the public Lucci GitHub organization.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

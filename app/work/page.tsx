import type { Metadata } from "next"
import Link from "next/link"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { getLucciRepositories } from "@/lib/github"
import { researchItems } from "@/lib/site-data"

export const metadata: Metadata = {
  title: "Work",
  description: "Research notes and open-source projects from Lucci Labs.",
}

export const revalidate = 3600

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(value))
}

export default async function WorkPage() {
  const repositories = await getLucciRepositories()

  return (
    <div className="shell" id="top">
      <SiteHeader />
      <main className="work-page">
        <section className="page-hero">
          <p className="eyebrow">Work</p>
          <h1>Research notes and the instruments built alongside them.</h1>
          <p className="page-hero-copy">
            Writing and software from the same investigations. The notes record what the
            work made clear; the projects are the systems built to test it. GitHub remains
            the source of truth for code.
          </p>
        </section>

        <section aria-labelledby="research-title">
          <div className="section-head">
            <h2 id="research-title">Research</h2>
            <span className="section-index">Newest first</span>
          </div>
          <div className="index-list">
            {researchItems.map((item) => {
              const content = (
                <>
                  <p className="index-date">{item.date}<br />{item.format}</p>
                  <div>
                    <h3 className="index-title">{item.title}</h3>
                    <p className="index-desc">{item.description}</p>
                  </div>
                </>
              )
              return item.slug ? (
                <Link className="index-entry" href={`/work/${item.slug}`} key={item.title}>
                  {content}
                </Link>
              ) : (
                <div className="index-entry is-forthcoming" key={item.title}>
                  {content}
                  <p className="index-forthcoming">Forthcoming</p>
                </div>
              )
            })}
          </div>
        </section>

        <section aria-labelledby="projects-title">
          <div className="section-head">
            <h2 id="projects-title">Projects</h2>
            <span className="section-index">Synced from GitHub</span>
          </div>
          <div className="project-list">
            {repositories.map((repository) => (
              <article className="project-entry" key={repository.name}>
                <h3 className="project-name">{repository.name}</h3>
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
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

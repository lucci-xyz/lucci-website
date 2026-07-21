import Link from "next/link"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { getLucciRepositories } from "@/lib/github"

export const revalidate = 3600

export default async function HomePage() {
  const repositories = await getLucciRepositories()
  const selected = repositories.slice(0, 3)

  return (
    <div className="shell" id="top">
      <SiteHeader />
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <h1 id="hero-title">Research, experiments, and useful software.</h1>
          <div className="hero-bottom">
            <p className="hero-copy">
              Lucci Labs is an independent research and development studio. We investigate
              emerging systems, build small products, and publish the work openly.
            </p>
            <p className="hero-meta">
              <span className="status-dot" /> Active research
              <br /> Open-source by default
            </p>
          </div>
        </section>

        <section aria-labelledby="work-title">
          <div className="section-head">
            <h2 id="work-title">Selected work</h2>
            <span className="section-index">01 / 04</span>
          </div>
          <div className="work-list">
            <Link className="work-item" href="/research/context-as-infrastructure">
              <h3 className="work-title">Context as infrastructure</h3>
              <p className="work-copy">
                A practical model for separating task framing, evidence, state, and durable
                memory in tool-using agent systems.
              </p>
              <p className="work-meta">Research note · 2026</p>
              <span className="arrow">↗</span>
            </Link>
            {selected.map((repository) => (
              <a className="work-item" href={repository.url} key={repository.name} target="_blank" rel="noreferrer">
                <h3 className="work-title">{repository.name}</h3>
                <p className="work-copy">{repository.description}</p>
                <p className="work-meta">{repository.language || "Open source"} · GitHub</p>
                <span className="arrow">↗</span>
              </a>
            ))}
          </div>
        </section>

        <section className="research-note" aria-labelledby="direction-title">
          <p className="label">Current direction</p>
          <div>
            <h2 id="direction-title">Building small systems to understand larger questions.</h2>
            <p>
              The work moves between research and application: studying what may become useful,
              then building enough to learn where the idea breaks.
            </p>
          </div>
        </section>

        <section className="about" aria-labelledby="about-title">
          <h2 id="about-title">About</h2>
          <div className="about-copy">
            <p>Lucci Labs publishes research notes, open-source software, prototypes, and technical documentation.</p>
            <p>The studio remains intentionally small and exploratory. Projects are developed further when the work proves useful.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

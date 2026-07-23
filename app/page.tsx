import Link from "next/link"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export default function HomePage() {
  return (
    <div className="shell" id="top">
      <SiteHeader />
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <h1 className="hero-wordmark" id="hero-title">Lucci Labs</h1>
          <p className="hero-tagline">Studying intelligent systems by building them.</p>
          <Link className="home-announcement" href="/work/context-as-infrastructure">
            <span className="pill"><span className="status-dot" />New</span>
            <span className="announcement-text">Context as infrastructure — our latest research note</span>
          </Link>
        </section>

        <section className="home-intro" aria-label="About Lucci Labs">
          <p>
            Lucci Labs is an independent research studio working on tool-using agents,
            local inference, and the interfaces around them. We are interested in what
            makes intelligent systems dependable in practice: how they receive context,
            how they act on it, and how the people using them stay oriented to what the
            system knows and does.
          </p>
          <p>
            The method is consistent. We formalize a question, build the smallest system
            that can test it, and publish what the work reveals — including where the idea
            holds and where it breaks. Theory and implementation move together; neither is
            allowed to drift far from the other.
          </p>
          <p>
            The current direction centers on context as infrastructure: treating the
            information an agent receives as versioned, observable system components
            rather than a prompt assembled once at the beginning of a run. The research
            notes and the instruments built alongside them are collected under{" "}
            <Link className="quiet-link" href="/work">Work</Link>.
          </p>
          <p>
            Everything is open source by default. The code lives on{" "}
            <a className="quiet-link" href="https://github.com/lucci-xyz" target="_blank" rel="noreferrer">GitHub</a>,
            and the lab reads its mail at{" "}
            <a className="quiet-link" href="mailto:contact@luccilabs.xyz">contact@luccilabs.xyz</a>.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

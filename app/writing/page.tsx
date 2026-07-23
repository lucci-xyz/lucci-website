import type { Metadata } from "next"
import Link from "next/link"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { researchItems } from "@/lib/site-data"

export const metadata: Metadata = {
  title: "Writing",
  description: "Research notes, studies, and working papers from Lucci Labs.",
}

export default function WritingPage() {
  return (
    <div className="shell" id="top">
      <SiteHeader />
      <main className="index-page">
        <section className="page-hero">
          <p className="eyebrow">Writing</p>
          <h1>Open questions, methods, and what the work made clear.</h1>
          <p className="page-hero-copy">
            Research notes, empirical studies, and working papers produced while
            investigating tool-using agents, local inference, and the systems around them.
          </p>
        </section>

        <section className="index-list" aria-label="Research notes, newest first">
          {researchItems.map((item) => {
            const content = (
              <>
                <p className="index-date">{item.date}<br />{item.format}</p>
                <div>
                  <h2 className="index-title">{item.title}</h2>
                  <p className="index-desc">{item.description}</p>
                </div>
              </>
            )
            return item.slug ? (
              <Link className="index-entry" href={`/writing/${item.slug}`} key={item.title}>
                {content}
              </Link>
            ) : (
              <div className="index-entry is-forthcoming" key={item.title}>
                {content}
                <p className="index-forthcoming">Forthcoming</p>
              </div>
            )
          })}
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

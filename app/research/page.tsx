import type { Metadata } from "next"
import { ResearchIndex } from "@/components/research-index"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { researchItems } from "@/lib/site-data"

export const metadata: Metadata = {
  title: "Research",
  description: "Research notes, studies, and working papers from Lucci Labs.",
}

export default function ResearchPage() {
  return (
    <div className="shell" id="top">
      <SiteHeader />
      <main>
        <section className="page-hero">
          <p className="eyebrow">Research</p>
          <div className="page-hero-row">
            <div>
              <h1>Open questions, methods, and what the work made clear.</h1>
              <p className="page-hero-copy">
                Technical notes, empirical studies, and working papers produced while
                investigating tool-using agents, local inference, and the systems around them.
              </p>
            </div>
            <p className="page-count">{researchItems.length.toString().padStart(2, "0")} publications<br />Updated 2026</p>
          </div>
        </section>
        <ResearchIndex items={researchItems} />
      </main>
      <SiteFooter />
    </div>
  )
}

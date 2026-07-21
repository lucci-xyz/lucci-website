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
              <h1>Questions, methods, and what became clear.</h1>
              <p className="page-hero-copy">
                Technical notes, studies, and working papers produced while investigating
                intelligent systems, infrastructure, and interface design.
              </p>
            </div>
            <p className="page-count">{researchItems.length.toString().padStart(2, "0")} publications<br />Updated 2026</p>
          </div>
        </section>
        <ResearchIndex items={researchItems} />
        <section className="page-note">
          <h2>Publishing approach</h2>
          <div className="page-note-copy">
            <p>Research is published when the method or result is useful—not only when a project is finished.</p>
            <p>Entries may be revised as experiments continue. Material changes are recorded in each publication.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

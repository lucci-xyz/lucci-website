import type { Metadata } from "next"
import Link from "next/link"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ArticleToc } from "@/components/article-toc"
import "./article.css"

export const metadata: Metadata = {
  title: "Context as infrastructure",
  description: "A Lucci Labs research note on context design for tool-using agent systems.",
}

const contents = [
  { id: "abstract", label: "Abstract" },
  { id: "prompt", label: "A prompt is not a system", num: "01" },
  { id: "layers", label: "Four context layers", num: "02" },
  { id: "late", label: "Deliver context late", num: "03" },
  { id: "observable", label: "Make context observable", num: "04" },
  { id: "interface", label: "The interface is the product", num: "05" },
]

export default function ContextAsInfrastructurePage() {
  return (
    <div className="article-shell" id="top">
      <div className="doc-frame">
        <SiteHeader />
        <div className="doc-layout">
          <aside className="doc-rail">
            <Link className="doc-back" href="/research">
              <span className="doc-back-ico" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8.5 3.5 5 7l3.5 3.5" />
                </svg>
              </span>
              <span className="doc-back-label">Research</span>
            </Link>
            <ArticleToc items={contents} />
            <div className="doc-rail-meta" aria-label="Publication metadata">
              <span>Lucci Labs Research</span>
              <span>Concept note · Working draft</span>
            </div>
          </aside>

          <main className="doc-main">
            <header className="doc-head">
              <p className="document-kicker">Research note 01 · July 2026</p>
              <h1>Context as infrastructure</h1>
              <p className="document-deck">
                Tool-using agents become more dependable when context is treated as a
                versioned system rather than a prompt assembled once at the beginning of a run.
              </p>
            </header>

            <div className="document-body">
            <section id="abstract" className="document-abstract">
              <h2>Abstract</h2>
              <p>
                Many failures attributed to an agent model are failures of the system around it.
                The agent receives stale instructions, irrelevant records, unclear permissions, or
                evidence with no visible provenance. When all of that information is flattened into
                one prompt, the application loses the ability to reason about what the model knew,
                when it knew it, and why a particular source affected the result.
              </p>
              <p>
                This note proposes treating context as infrastructure. Stable identity, immediate
                task instructions, retrieved evidence, and mutable state should remain separate,
                versioned objects. Each layer should enter the run at the moment it becomes useful
                and remain inspectable after the run is complete.
              </p>
            </section>

            <figure className="document-figure" aria-labelledby="manifest-title">
              <div className="manifest-diagram" role="img" aria-label="Four context layers with distinct lifecycles">
                <div><strong>Identity</strong><span>Long-lived</span><p>Operating principles, permissions, and durable behavior.</p></div>
                <div><strong>Task</strong><span>Per run</span><p>The objective, audience, constraints, and expected output.</p></div>
                <div><strong>Evidence</strong><span>Retrieved</span><p>Records and observations selected for the current decision.</p></div>
                <div><strong>State</strong><span>Mutable</span><p>Actions, outcomes, and unresolved work produced during the run.</p></div>
              </div>
              <figcaption id="manifest-title">
                <span>Figure 01</span>
                A context manifest keeps information with different purposes and lifecycles from
                collapsing into a single prompt.
              </figcaption>
            </figure>

            <section id="prompt">
              <p className="document-section-number">01</p>
              <h2>A prompt is not a context system</h2>
              <p>
                A prompt can describe the immediate task, but it cannot manage the complete
                information environment of a long-running agent. It does not determine which
                records are current, which tools are permitted, which actions have already
                occurred, or which facts should persist into the next run.
              </p>
              <p>
                Applications often hide these concerns inside prompt construction code. A single
                string quietly combines behavioral rules, user preferences, retrieved documents,
                tool descriptions, conversation history, and intermediate state. The model sees a
                sequence of tokens; the product team sees an increasingly difficult debugging
                problem.
              </p>
              <p>
                Treating context as a system changes the unit of design. Instead of asking how to
                write a larger prompt, the application asks which information object is needed,
                who owns it, how it changes, and when it should become available.
              </p>
            </section>

            <section id="layers">
              <p className="document-section-number">02</p>
              <h2>Separate what the agent is, knows, sees, and does</h2>
              <p>
                Context becomes easier to reason about when information is divided by function.
                Identity defines durable behavior and permissions. The task describes the current
                objective. Evidence contains external material relevant to a decision. State records
                what has happened and what remains open.
              </p>
              <p>
                These layers may all appear in the same model request, but they should not share the
                same lifecycle. Updating a task should not silently rewrite the agent&apos;s durable
                operating principles. Retrieving a new document should not mutate the historical
                record of an earlier run. A state transition should remain visible even after the
                conversation that produced it is compressed.
              </p>
              <div className="document-definition-list">
                <div><h3>Identity</h3><p>Stable behavior, operating principles, and permissions.</p></div>
                <div><h3>Task</h3><p>The immediate objective, audience, format, and success criteria.</p></div>
                <div><h3>Evidence</h3><p>Files, records, observations, and retrieved source material.</p></div>
                <div><h3>State</h3><p>Completed actions, open decisions, and mutable workflow data.</p></div>
              </div>
            </section>

            <section id="late">
              <p className="document-section-number">03</p>
              <h2>Deliver context late</h2>
              <p>
                More context is not automatically better context. Loading every available record at
                the beginning of a run increases cost, weakens attention, and makes it harder to
                determine which evidence influenced an action. Information should enter when the
                system reaches a decision that can use it.
              </p>
              <p>
                This makes retrieval a timing problem as much as a search problem. The application
                must recognize the current decision, identify the evidence required for that
                decision, and expose only the smallest useful set. A later step may require a
                different source set even when the overall task has not changed.
              </p>
              <blockquote>
                Retrieval is not simply the act of finding information. It is the design of when
                information becomes available and what the agent is allowed to do with it.
              </blockquote>
            </section>

            <section id="observable">
              <p className="document-section-number">04</p>
              <h2>Make context observable</h2>
              <p>
                A dependable system should make every context layer inspectable. For any run, a
                reviewer should be able to identify the version of the identity layer, the exact task
                instructions, the records retrieved, and the state changes produced by tools.
              </p>
              <p>
                This record supports more than debugging. It allows teams to compare runs, evaluate
                retrieval policies, reproduce failures, and understand whether an improvement came
                from a stronger model or a better information interface.
              </p>
              <div className="document-table" role="table" aria-label="Example context manifest">
                <div role="row"><span role="columnheader">Layer</span><span role="columnheader">Version</span><span role="columnheader">Lifecycle</span></div>
                <div role="row"><span>Identity</span><span>12</span><span>Long-lived</span></div>
                <div role="row"><span>Task</span><span>1</span><span>Per run</span></div>
                <div role="row"><span>Evidence</span><span>7</span><span>Retrieved</span></div>
                <div role="row"><span>State</span><span>19</span><span>Mutable</span></div>
              </div>
            </section>

            <section id="interface">
              <p className="document-section-number">05</p>
              <h2>The interface around the model is the product</h2>
              <p>
                Model capability will continue to improve, but stronger models do not eliminate the
                need for context design. As systems gain access to more tools and more consequential
                actions, applications need greater control over what the model knows, which evidence
                it can trust, and what it is permitted to change.
              </p>
              <p>
                The quality of an agent product therefore depends on the interface between the model
                and the rest of the system. That interface should be layered, versioned, observable,
                and capable of delivering information at the moment it becomes useful.
              </p>
              <p>
                Context is not supporting material around the intelligence. In a tool-using system,
                context is part of the infrastructure that makes the intelligence usable.
              </p>
            </section>

            <footer className="document-notes">
              <section>
                <h2>Citation</h2>
                <p>Lucci Labs. “Context as Infrastructure.” Research Note 01, July 2026.</p>
              </section>
              <section>
                <h2>Related</h2>
                <p><Link href="/docs">Context manifest documentation</Link></p>
                <p><Link href="/projects">Open-source projects</Link></p>
              </section>
            </footer>
            </div>
          </main>
        </div>
        <SiteFooter />
      </div>
    </div>
  )
}

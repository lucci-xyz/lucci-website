import type { Metadata } from "next"
import Link from "next/link"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "Context as infrastructure",
  description: "A Lucci Labs research note on context design for tool-using agent systems.",
}

export default function ContextAsInfrastructurePage() {
  return (
    <div className="shell article-shell" id="top">
      <SiteHeader />
      <main>
        <article>
          <header className="publication-header">
            <Link className="article-back" href="/research">← Research index</Link>
            <p className="eyebrow">Research note 01 · Draft</p>
            <h1>Context as infrastructure</h1>
            <p className="publication-deck">
              Tool-using agents become more dependable when context is treated as a versioned
              system rather than a single prompt assembled at the beginning of a run.
            </p>
            <div className="publication-meta">
              <div><span className="meta-label">Published</span><span>July 2026</span></div>
              <div><span className="meta-label">Format</span><span>Concept note</span></div>
              <div><span className="meta-label">Status</span><span>Working draft</span></div>
            </div>
          </header>

          <figure className="publication-figure" aria-labelledby="context-flow-title">
            <figcaption>
              <div><p className="eyebrow">Figure 01</p><h2 id="context-flow-title">Context enters at three different moments.</h2></div>
              <p>The system should decide what to provide before, during, and after a run rather than collapsing every source into one prompt.</p>
            </figcaption>
            <div className="context-flow">
              <div><span>01</span><h3>Frame</h3><p>Define the task, constraints, tools, and current operating state.</p></div>
              <div><span>02</span><h3>Retrieve</h3><p>Bring in evidence only when the next decision requires it.</p></div>
              <div><span>03</span><h3>Record</h3><p>Persist outcomes, sources, and state changes as separate artifacts.</p></div>
            </div>
          </figure>

          <div className="publication-layout">
            <aside className="publication-toc">
              <p>On this page</p>
              <a href="#prompt">A prompt is not a system</a>
              <a href="#layers">Separate the layers</a>
              <a href="#late">Deliver context late</a>
              <a href="#observable">Make layers observable</a>
              <a href="#interface">The interface is the product</a>
            </aside>

            <div className="publication-body">
              <p className="publication-intro">
                Many agent failures that look like model failures are interface failures. The system delivered the wrong information, delivered it too early, or made it impossible to inspect which source influenced the result.
              </p>

              <section id="prompt">
                <p className="section-number">01</p>
                <h2>A prompt is not a context system.</h2>
                <p>A prompt can describe a task. It cannot, by itself, manage changing evidence, durable state, tool permissions, or source provenance across a long-running workflow.</p>
                <p>Context infrastructure should make those concerns explicit. Each layer should have a narrow purpose, a known owner, and a visible version history.</p>
              </section>

              <section id="layers">
                <p className="section-number">02</p>
                <h2>Separate what the agent is, knows, sees, and does.</h2>
                <div className="definition-list">
                  <div><h3>Identity</h3><p>Long-lived behavior, operating principles, and stable permissions.</p></div>
                  <div><h3>Task</h3><p>The immediate objective, audience, format, constraints, and success criteria.</p></div>
                  <div><h3>Evidence</h3><p>Files, records, observations, and retrieved material relevant to a decision.</p></div>
                  <div><h3>State</h3><p>What has already happened, what remains open, and what may be changed next.</p></div>
                </div>
              </section>

              <section id="late">
                <p className="section-number">03</p>
                <h2>Good context is delivered late.</h2>
                <p>Information should enter when the system can act on it. Loading every possible source at the start creates noise, increases cost, and makes causal inspection harder.</p>
                <blockquote>Retrieval is not only a search problem. It is a timing and interface problem.</blockquote>
              </section>

              <section id="observable">
                <p className="section-number">04</p>
                <h2>Make every layer observable.</h2>
                <p>A useful context system exposes which version of each layer was present, which records were retrieved, and which tool actions changed the state of the run.</p>
                <div className="manifest-table" role="table" aria-label="Example context manifest">
                  <div role="row"><span role="columnheader">Layer</span><span role="columnheader">Version</span><span role="columnheader">Lifecycle</span></div>
                  <div role="row"><span>Identity</span><span>12</span><span>Long-lived</span></div>
                  <div role="row"><span>Task</span><span>1</span><span>Per run</span></div>
                  <div role="row"><span>Evidence</span><span>7</span><span>Retrieved</span></div>
                  <div role="row"><span>State</span><span>19</span><span>Mutable</span></div>
                </div>
              </section>

              <section id="interface">
                <p className="section-number">05</p>
                <h2>The interface around the model is the product.</h2>
                <p>Model capability will continue to improve, but capable models do not remove the need for context design. The more actions a system can take, the more precisely the application must control what the model knows and what it is allowed to change.</p>
                <p>Context should be treated as infrastructure: layered, versioned, observable, and delivered at the moment it becomes useful.</p>
              </section>
            </div>
          </div>

          <div className="paper-end">
            <div>
              <h2>Citation</h2>
              <p>Use the following citation for this concept note.</p>
              <div className="citation">Lucci Labs. “Context as Infrastructure.” Research Note 01, July 2026.</div>
            </div>
            <div>
              <h2>Related</h2>
              <ul>
                <li><Link href="/research">Research index ↗</Link></li>
                <li><Link href="/docs">Context manifest documentation ↗</Link></li>
                <li><Link href="/projects">Open-source projects ↗</Link></li>
              </ul>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  )
}

"use client"

import { useMemo, useState } from "react"

type Language = "python" | "typescript" | "curl"

const installCommands = {
  python: "pip install lucci",
  typescript: "npm install @lucci/sdk",
}

const examples: Record<Language, string> = {
  python: `from lucci import Lucci

client = Lucci()

run = client.runs.create(
    instruction="Summarize the evaluation findings",
    context={
        "task": {"audience": "engineering", "format": "brief"},
        "evidence": ["file_eval_01", "file_eval_02"],
    },
)

print(run.output)`,
  typescript: `import { Lucci } from "@lucci/sdk";

const client = new Lucci();

const run = await client.runs.create({
  instruction: "Summarize the evaluation findings",
  context: {
    task: { audience: "engineering", format: "brief" },
    evidence: ["file_eval_01", "file_eval_02"]
  }
});

console.log(run.output);`,
  curl: `curl https://api.luccilabs.xyz/v1/runs \\
  -H "Authorization: Bearer $LUCCI_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "instruction": "Summarize the evaluation findings",
    "context": {"evidence": ["file_eval_01", "file_eval_02"]}
  }'`,
}

function CodeBlock({ label, code }: { label: string; code: string }) {
  const [copied, setCopied] = useState(false)
  async function copy() {
    await navigator.clipboard?.writeText(code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1100)
  }
  return (
    <div className="code-block">
      <div className="code-head"><span>{label}</span><button className="copy-button" type="button" onClick={copy}>{copied ? "Copied" : "Copy"}</button></div>
      <pre><code>{code}</code></pre>
    </div>
  )
}

export function DocsQuickstart() {
  const [installLanguage, setInstallLanguage] = useState<"python" | "typescript">("python")
  const [exampleLanguage, setExampleLanguage] = useState<Language>("python")
  const [query, setQuery] = useState("")
  const searchItems = useMemo(() => [
    ["Prerequisites", "#prerequisites"],
    ["Install", "#install"],
    ["Create your first run", "#first-run"],
    ["Context manifests", "#how-it-works"],
    ["Use with an AI coding agent", "#ai-ready"],
  ], [])
  const results = query ? searchItems.filter(([label]) => label.toLowerCase().includes(query.toLowerCase())) : []

  return (
    <div className="docs-page">
      <header className="docs-header">
        <div className="docs-brand"><a className="wordmark" href="/">lucci labs</a><span className="docs-label">docs</span></div>
        <div className="docs-search">
          <input aria-label="Search documentation" placeholder="Search documentation" value={query} onChange={(event) => setQuery(event.target.value)} />
          <span className="shortcut">⌘ K</span>
          {results.length > 0 && <div className="search-results open">{results.map(([label, href]) => <a key={href} href={href} onClick={() => setQuery("")}>{label}</a>)}</div>}
        </div>
        <div className="docs-header-links"><a href="/research">Research</a><a href="https://github.com/lucci-xyz" target="_blank" rel="noreferrer">GitHub</a></div>
      </header>

      <div className="docs-layout">
        <aside className="docs-sidebar">
          <div className="docs-group"><p>Getting started</p><a aria-current="page" href="#top">Introduction</a><a href="#prerequisites">Prerequisites</a><a href="#install">Install</a><a href="#first-run">First run</a></div>
          <div className="docs-group"><p>Core concepts</p><a href="#how-it-works">Context manifests</a><a href="#how-it-works">Runs</a><a href="#how-it-works">Tools</a><a href="#how-it-works">Events</a></div>
          <div className="docs-group"><p>For AI agents</p><a href="/llms.txt">llms.txt</a><a href="#ai-ready">Markdown pages</a><a href="/openapi.json">OpenAPI schema</a></div>
        </aside>

        <main className="docs-content" id="top">
          <p className="breadcrumbs">Docs / Getting started / Quickstart</p>
          <h1>Quickstart</h1>
          <p className="docs-lead">Install the SDK and create a tool-using run with a versioned context manifest.</p>
          <div className="doc-tools"><a href="/llms.txt">llms.txt</a><a href="/openapi.json">OpenAPI</a></div>
          <div className="docs-notice"><strong>Interface preview.</strong> These examples define the intended developer experience. They are not production endpoints yet.</div>

          <section id="prerequisites"><h2>Prerequisites</h2><ul><li>Python 3.10+ or Node.js 20+</li><li>A Lucci Labs API key when the preview opens</li></ul></section>

          <section id="install">
            <h2>Install</h2><p>Choose the SDK that matches your project.</p>
            <div className="tabs" role="tablist">{(["python", "typescript"] as const).map((language) => <button className={`tab${installLanguage === language ? " active" : ""}`} key={language} type="button" onClick={() => setInstallLanguage(language)}>{language === "python" ? "Python" : "TypeScript"}</button>)}</div>
            <CodeBlock label="Terminal" code={installCommands[installLanguage]} />
          </section>

          <section id="first-run">
            <h2>Create your first run</h2><p>A run combines an instruction with a context manifest. The manifest keeps task information and evidence separate so both can be inspected later.</p>
            <div className="tabs" role="tablist">{(["python", "typescript", "curl"] as Language[]).map((language) => <button className={`tab${exampleLanguage === language ? " active" : ""}`} key={language} type="button" onClick={() => setExampleLanguage(language)}>{language === "curl" ? "cURL" : language[0].toUpperCase() + language.slice(1)}</button>)}</div>
            <CodeBlock label={exampleLanguage === "curl" ? "cURL" : exampleLanguage} code={examples[exampleLanguage]} />
          </section>

          <section id="how-it-works">
            <h2>What the SDK is doing</h2>
            <div className="explanation-list">
              <div><code>instruction</code><p>The immediate objective for this run.</p></div>
              <div><code>context.task</code><p>Output constraints and audience information for the current task.</p></div>
              <div><code>context.evidence</code><p>Versioned files or records made available to the run.</p></div>
              <div><code>run.output</code><p>The final result with tool activity and source references attached.</p></div>
            </div>
          </section>

          <section id="ai-ready"><h2>Use the docs with an AI coding agent</h2><p>Documentation is available through machine-readable discovery files so a coding agent can inspect the current interface without scraping the rendered page.</p><CodeBlock label="Documentation endpoints" code={`https://luccilabs.xyz/llms.txt\nhttps://luccilabs.xyz/docs\nhttps://luccilabs.xyz/openapi.json`} /></section>
        </main>

        <aside className="docs-onpage"><p>On this page</p><a href="#prerequisites">Prerequisites</a><a href="#install">Install</a><a href="#first-run">Create your first run</a><a href="#how-it-works">What the SDK is doing</a><a href="#ai-ready">Use with an AI agent</a></aside>
      </div>
    </div>
  )
}

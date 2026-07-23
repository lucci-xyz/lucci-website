"use client"

import { useMemo, useState } from "react"

type CodeFile = { name: string; lang: string; code: string }

const installFiles: CodeFile[] = [
  { name: "Python", lang: "py", code: "pip install lucci" },
  { name: "TypeScript", lang: "ts", code: "npm install @lucci/sdk" },
]

const runFiles: CodeFile[] = [
  {
    name: "setup.py",
    lang: "py",
    code: `from lucci import Lucci

client = Lucci()

# Combine an instruction with a versioned context manifest
run = client.runs.create(
    instruction="Summarize the evaluation findings",
    context={
        "task": {"audience": "engineering", "format": "brief"},
        "evidence": ["file_eval_01", "file_eval_02"],
    },
)

print(run.output)`,
  },
  {
    name: "setup.ts",
    lang: "ts",
    code: `import { Lucci } from "@lucci/sdk";

const client = new Lucci();

// Combine an instruction with a versioned context manifest
const run = await client.runs.create({
  instruction: "Summarize the evaluation findings",
  context: {
    task: { audience: "engineering", format: "brief" },
    evidence: ["file_eval_01", "file_eval_02"]
  }
});

console.log(run.output);`,
  },
  {
    name: "request.sh",
    lang: "sh",
    code: `curl https://api.luccilabs.xyz/v1/runs \\
  -H "Authorization: Bearer $LUCCI_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "instruction": "Summarize the evaluation findings",
    "context": {"evidence": ["file_eval_01", "file_eval_02"]}
  }'`,
  },
]

const endpointFiles: CodeFile[] = [
  {
    name: "endpoints",
    lang: "text",
    code: `https://luccilabs.xyz/llms.txt
https://luccilabs.xyz/docs
https://luccilabs.xyz/openapi.json`,
  },
]

const KEYWORDS = new Set([
  "import", "from", "as", "const", "let", "var", "new", "await", "async",
  "function", "return", "export", "default", "if", "else", "elif", "for",
  "of", "in", "while", "with", "and", "or", "not", "def", "class", "lambda",
  "true", "false", "none", "null", "undefined", "void", "interface", "type",
])

// Lightweight tokenizer: URLs (kept plain), comments, strings, numbers, keywords.
// URLs are matched first so "https://" is never read as a // comment.
function highlight(code: string) {
  const nodes: Array<string | JSX.Element> = []
  const re = /([a-z][a-z0-9+.-]*:\/\/[^\s'"`)]+)|(\/\/[^\n]*|#[^\n]*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)/g
  let last = 0
  let key = 0
  let match: RegExpExecArray | null
  while ((match = re.exec(code)) !== null) {
    if (match.index > last) nodes.push(code.slice(last, match.index))
    const [full, url, comment, str, num, word] = match
    if (url) nodes.push(full)
    else if (comment) nodes.push(<span key={key++} className="tok-c">{full}</span>)
    else if (str) nodes.push(<span key={key++} className="tok-s">{full}</span>)
    else if (num) nodes.push(<span key={key++} className="tok-n">{full}</span>)
    else if (word && KEYWORDS.has(word.toLowerCase())) nodes.push(<span key={key++} className="tok-k">{full}</span>)
    else nodes.push(full)
    last = re.lastIndex
  }
  if (last < code.length) nodes.push(code.slice(last))
  return nodes
}

const CopyIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="11" height="11" rx="2.4" />
    <path d="M5 15V5a2 2 0 0 1 2-2h10" />
  </svg>
)
const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m20 6-11 11-5-5" />
  </svg>
)

function CodeCard({ files }: { files: CodeFile[] }) {
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState(false)
  const file = files[active]

  async function copy() {
    await navigator.clipboard?.writeText(file.code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1200)
  }

  return (
    <div className="code-card">
      <div className="code-card-bar">
        <span className="traffic" aria-hidden="true"><i /><i /><i /></span>
        <div className="code-tabs" role="tablist">
          {files.map((f, i) => (
            <button
              key={f.name}
              type="button"
              role="tab"
              aria-selected={i === active}
              className={`code-tab${i === active ? " active" : ""}`}
              onClick={() => setActive(i)}
            >
              {f.name}
            </button>
          ))}
        </div>
        <button className="code-copy" type="button" onClick={copy} aria-label={copied ? "Copied" : "Copy code"}>
          {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </div>
      <pre className="code-body"><code>{highlight(file.code)}</code></pre>
    </div>
  )
}

export function DocsQuickstart() {
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
        <div className="docs-brand"><a className="wordmark" href="/">Lucci Labs</a><span className="docs-label">Docs</span></div>
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
          <p className="docs-lead">Install the SDK and issue a tool-using run against a versioned context manifest.</p>
          <div className="doc-tools"><a href="/llms.txt">llms.txt</a><a href="/openapi.json">OpenAPI</a></div>
          <div className="docs-notice"><strong>Interface preview.</strong> These examples specify the intended developer surface. They are not live endpoints yet.</div>

          <section id="prerequisites"><h2>Prerequisites</h2><ul><li>Python 3.10+ or Node.js 20+</li><li>A Lucci Labs API key when the preview opens</li></ul></section>

          <section id="install">
            <h2>Install</h2><p>Choose the SDK that matches your project.</p>
            <CodeCard files={installFiles} />
          </section>

          <section id="first-run">
            <h2>Create your first run</h2><p>A run combines an instruction with a context manifest. The manifest keeps task information and evidence separate so both can be inspected later.</p>
            <CodeCard files={runFiles} />
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

          <section id="ai-ready"><h2>Use the docs with an AI coding agent</h2><p>Documentation is available through machine-readable discovery files so a coding agent can inspect the current interface without scraping the rendered page.</p><CodeCard files={endpointFiles} /></section>
        </main>

        <aside className="docs-onpage"><p>On this page</p><a href="#prerequisites">Prerequisites</a><a href="#install">Install</a><a href="#first-run">Create your first run</a><a href="#how-it-works">What the SDK is doing</a><a href="#ai-ready">Use with an AI agent</a></aside>
      </div>
    </div>
  )
}

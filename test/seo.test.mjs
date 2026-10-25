import assert from "node:assert/strict"
import { existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import path from "node:path"
import { createRequire } from "node:module"
import { test } from "node:test"
import vm from "node:vm"
import ts from "typescript"
import { renderToStaticMarkup } from "react-dom/server"

const require = createRequire(import.meta.url)
const sourceRoot = new URL("../", import.meta.url)

function load(relativePath, cwd = process.cwd()) {
  const exports = {}
  const compiled = ts.transpileModule(readFileSync(new URL(relativePath, sourceRoot), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true, jsx: ts.JsxEmit.ReactJSX },
  }).outputText
  vm.runInNewContext(compiled, {
    exports, URL, Response, Request,
    process: { cwd: () => cwd, env: {} },
    require: (name) => name.startsWith("@/") ? load(name.slice(2)+".ts", cwd) : require(name),
  })
  return exports
}

test("JSON-LD preserves content while preventing script-element injection", () => {
  const { JsonLd } = load("components/json-ld.tsx")
  const payload = { name: '</script><script>alert("test")</script>', description: "A & B" }
  const html = renderToStaticMarkup(JsonLd({ data: payload }))
  assert.equal((html.match(/<script/g) ?? []).length, 1)
  assert.ok(html.includes("\\u003c/script>"))
  const content = html.match(/<script[^>]*>(.*)<\/script>/s)[1]
  assert.deepEqual(JSON.parse(content), payload)
})

test("page metadata resolves each canonical and social URL to the owning domain", () => {
  const { pageMetadata, SITE_URL } = load("lib/seo.ts")
  for (const page of ["", "/writing", "/solutions/ai"]) {
    const result = pageMetadata(page, "A & B", "A useful description")
    assert.equal(result.alternates.canonical, SITE_URL+page)
    assert.equal(result.openGraph.url, SITE_URL+page)
    assert.equal(result.description, "A useful description")
  }
})

if (existsSync(new URL("../lib/discovery.ts", import.meta.url))) {
  test("sitemap, feed and source exports admit only explicitly published research", async () => {
    const root = mkdtempSync(path.join(tmpdir(), "lucci-discovery-"))
    try {
      const content = path.join(root, "content/writing")
      mkdirSync(content, { recursive: true })
      for (const [slug, flag] of [["public", "published: true"], ["draft", "published: false"], ["missing", ""], ["string-flag", 'published: "true"']]) {
        writeFileSync(path.join(content, slug+".mdx"), `---\ntitle: "A & B"\ndescription: "Testing <limits> & evidence"\ndate: 2026-10-24\nformat: Research note\n${flag}\n---\nPublic body`)
      }
      const discovery = load("lib/discovery.ts", root)
      assert.deepEqual(Array.from(discovery.getDiscoveryNotes(), (note) => note.slug), ["public"])
      const sitemap = load("app/sitemap.ts", root).default()
      assert.equal(sitemap.filter((item) => item.url.includes("/writing/")).length, 1)
      assert.ok(sitemap.some((item) => item.url.endsWith("/writing/public")))
      assert.ok(!sitemap.some((item) => item.url.endsWith("/docs/loop")))
      const feed = await load("app/feed.xml/route.ts", root).GET().text()
      assert.ok(feed.includes("A &amp; B"))
      assert.ok(feed.includes("&lt;limits&gt; &amp; evidence"))
      assert.ok(!feed.includes("/writing/draft"))
      const overview = load("app/index.md/route.ts", root)
      assert.ok(!(await overview.GET().text()).includes("/docs/loop"))
      const docs = path.join(root, "content/docs")
      mkdirSync(docs, { recursive: true })
      const guide = (flag) => `---\ntitle: Loop\ndescription: Guide\npublished: ${flag}\n---\nGuide body`
      writeFileSync(path.join(docs, "loop.mdx"), guide(false))
      assert.ok(!(await overview.GET().text()).includes("/docs/loop"))
      writeFileSync(path.join(docs, "loop.mdx"), guide(true))
      assert.ok((await overview.GET().text()).includes("/docs/loop"))
      const markdown = load("app/writing/[slug]/markdown/route.ts", root)
      for (const slug of ["draft", "missing", "string-flag", "unknown"]) {
        const response = await markdown.GET(new Request("https://example.com"), { params: Promise.resolve({slug}) })
        assert.equal(response.status, 404)
      }
      const response = await markdown.GET(new Request("https://example.com"), { params: Promise.resolve({slug: "public"}) })
      assert.equal(response.status, 200)
      assert.equal(response.headers.get("x-robots-tag"), "noindex")
      assert.ok((await response.text()).includes("Public body"))
    } finally { rmSync(root, {recursive: true, force: true}) }
  })
} else {
  test("HQ HTTPS redirects retain path and campaign parameters; preview hosts stay noindex", () => {
    const { NextRequest } = require("next/server")
    const { middleware } = load("middleware.ts")
    const request = new NextRequest("http://luccihq.com/solutions/ai?utm_source=check")
    const response = middleware(request)
    assert.equal(response.status, 308)
    assert.equal(response.headers.get("location"), "https://luccihq.com/solutions/ai?utm_source=check")
    const secure = middleware(new NextRequest("https://luccihq.com/about"))
    assert.equal(secure.headers.get("location"), null)
    assert.equal(secure.headers.get("x-robots-tag"), null)
    const preview = middleware(new NextRequest("https://luccihq.nat-483.workers.dev/"))
    assert.equal(preview.headers.get("x-robots-tag"), "noindex")
  })
}

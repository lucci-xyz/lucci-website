import assert from "node:assert/strict"
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import path from "node:path"
import { createRequire } from "node:module"
import { test } from "node:test"
import vm from "node:vm"
import ts from "typescript"

const require = createRequire(import.meta.url)
const sourceRoot = new URL("../", import.meta.url)

function loadReader(root) {
  function load(relativePath) {
    const exports = {}
    const compiled = ts.transpileModule(readFileSync(new URL(relativePath, sourceRoot), "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
    }).outputText
    vm.runInNewContext(compiled, {
      exports, process: { cwd: () => root },
      require: (name) => name === "./site-data" ? load("lib/site-data.ts") : require(name),
    })
    return exports
  }
  return load("lib/writing.ts")
}

test("the writing index contains published articles in descending publication date order", () => {
  const root = mkdtempSync(path.join(tmpdir(), "lucci-writing-index-"))
  try {
    const content = path.join(root, "content/writing")
    mkdirSync(content, { recursive: true })
    for (const [slug, date, published] of [
      ["oldest", "2025-07-22", true],
      ["middle", '\"2026-09-22\"', true],
      ["newest", "2026-10-18", true],
      ["draft", "2026-10-24", false],
    ]) {
      writeFileSync(path.join(content, `${slug}.mdx`), `---\ntitle: ${slug}\ndescription: Test article\nformat: Research note\ndate: ${date}\npublished: ${published}\n---\nBody`)
    }
    const reader = loadReader(root)
    const items = Array.from(reader.getWritingIndex())
    assert.deepEqual(items.map((item) => item.slug), ["newest", "middle", "oldest"])
    assert.deepEqual(items.map((item) => item.dateISO), ["2026-10-18", "2026-09-22", "2025-07-22"])
    assert.equal(reader.getNote("draft"), undefined)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

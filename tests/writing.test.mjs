import assert from "node:assert/strict"
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import path from "node:path"
import { createRequire } from "node:module"
import { test } from "node:test"
import vm from "node:vm"
import ts from "typescript"

const require = createRequire(import.meta.url)

test("the actual writing reader admits only explicit YAML boolean true", () => {
  const root = mkdtempSync(path.join(tmpdir(), "lucci-writing-"))
  try {
    const content = path.join(root, "content/writing")
    mkdirSync(content, { recursive: true })
    for (const [slug, status] of [["approved", "true"], ["draft", "false"],
      ["missing", undefined], ["string-true", '"true"'], ["_template", "true"]]) {
      writeFileSync(path.join(content, `${slug}.mdx`), `---\ntitle: ${slug}\ndate: 2026-10-24\n${status ? `published: ${status}\n` : ""}---\nBody`)
    }
    const exports = {}
    const compiled = ts.transpileModule(readFileSync(new URL("../lib/writing.ts", import.meta.url), "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
    }).outputText
    vm.runInNewContext(compiled, {
      exports, process: { cwd: () => root },
      require: (name) => name === "./site-data" ? { forthcomingItems: [] } : require(name),
    })
    assert.equal(JSON.stringify(exports.getPublishedNotes().map((note) => note.slug)), '["approved"]')
    assert.equal(exports.getNote("draft"), undefined)
    assert.equal(exports.getNote("missing"), undefined)
    assert.equal(exports.getNote("string-true"), undefined)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

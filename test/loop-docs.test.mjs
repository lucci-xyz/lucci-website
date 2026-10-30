import assert from "node:assert/strict"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import path from "node:path"
import { test } from "node:test"
import { getLoopGuide } from "../lib/loop-docs.ts"

// lib/loop-docs.ts gates the Loop reproduction guide: the guide in
// content/docs/loop.mdx is served only when its frontmatter carries
// published: true, or during an isolated local private preview
// (LOOP_PRIVATE_PREVIEW=1, NODE_ENV=development, no Vercel environment).
// Missing files and missing title/description metadata fail closed.
// Each case runs against a fixture content tree in a temp working directory.

const originalCwd = process.cwd()
const originalEnv = {
  LOOP_PRIVATE_PREVIEW: process.env.LOOP_PRIVATE_PREVIEW,
  NODE_ENV: process.env.NODE_ENV,
  VERCEL: process.env.VERCEL,
}

function setEnv(values) {
  for (const [key, value] of Object.entries(values)) {
    if (value === undefined) delete process.env[key]
    else process.env[key] = value
  }
}

function fixture(t, frontmatter) {
  const root = mkdtempSync(path.join(tmpdir(), "lucci-loop-docs-"))
  if (frontmatter !== null) {
    mkdirSync(path.join(root, "content", "docs"), { recursive: true })
    writeFileSync(path.join(root, "content", "docs", "loop.mdx"), frontmatter)
  }
  process.chdir(root)
  t.after(() => {
    process.chdir(originalCwd)
    setEnv(originalEnv)
    rmSync(root, { recursive: true, force: true })
  })
}

const guide = (flags) => `---\ntitle: Reproduce the Loop analysis\ndescription: Run the numerical checks.\n${flags}---\n\nGuide body.\n`

test("returns undefined when the guide file does not exist", (t) => {
  fixture(t, null)
  setEnv({ LOOP_PRIVATE_PREVIEW: undefined, NODE_ENV: "production", VERCEL: undefined })
  assert.equal(getLoopGuide(), undefined)
})

test("returns a published guide with its metadata and body", (t) => {
  fixture(t, guide("published: true\n"))
  setEnv({ LOOP_PRIVATE_PREVIEW: undefined, NODE_ENV: "production", VERCEL: undefined })
  const result = getLoopGuide()
  assert.equal(result.title, "Reproduce the Loop analysis")
  assert.equal(result.description, "Run the numerical checks.")
  assert.equal(result.published, true)
  assert.match(result.content, /Guide body\./)
})

test("hides a guide whose published flag is false or absent", (t) => {
  fixture(t, guide("published: false\n"))
  setEnv({ LOOP_PRIVATE_PREVIEW: undefined, NODE_ENV: "production", VERCEL: undefined })
  assert.equal(getLoopGuide(), undefined)

  fixture(t, guide(""))
  assert.equal(getLoopGuide(), undefined)
})

test("admits an unpublished guide only in an isolated local private preview", (t) => {
  fixture(t, guide("published: false\n"))
  setEnv({ LOOP_PRIVATE_PREVIEW: "1", NODE_ENV: "development", VERCEL: undefined })
  const result = getLoopGuide()
  assert.equal(result.title, "Reproduce the Loop analysis")
  assert.equal(result.published, false)
})

test("private preview stays closed on Vercel or outside development", (t) => {
  fixture(t, guide("published: false\n"))
  setEnv({ LOOP_PRIVATE_PREVIEW: "1", NODE_ENV: "development", VERCEL: "1" })
  assert.equal(getLoopGuide(), undefined)

  setEnv({ LOOP_PRIVATE_PREVIEW: "1", NODE_ENV: "production", VERCEL: undefined })
  assert.equal(getLoopGuide(), undefined)
})

test("returns undefined when title or description metadata is missing", (t) => {
  fixture(t, "---\ndescription: Run the numerical checks.\npublished: true\n---\n\nGuide body.\n")
  setEnv({ LOOP_PRIVATE_PREVIEW: undefined, NODE_ENV: "production", VERCEL: undefined })
  assert.equal(getLoopGuide(), undefined)

  fixture(t, "---\ntitle: Reproduce the Loop analysis\npublished: true\n---\n\nGuide body.\n")
  assert.equal(getLoopGuide(), undefined)
})

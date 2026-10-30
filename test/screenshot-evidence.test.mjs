import assert from "node:assert/strict"
import { test } from "node:test"
import { mkdtemp, rm, readdir } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { ORIGIN, PAGES, assertCaptureDocument, saveCapture } from "../scripts/screenshot-evidence.mjs"

const valid = { status: 200, url: ORIGIN + "/", heading: PAGES[0].heading, body: "Lucci", errors: [] }
test("capture guards accept candidate content and reject successful HTTP login/error pages", () => {
  assert.doesNotThrow(() => assertCaptureDocument(valid, PAGES[0]))
  for (const change of [
    { status: 500 }, { heading: "Sign in" }, { url: "https://luccilabs.xyz/" },
    { url: ORIGIN + "/login" }, { body: "Application error: a client-side exception has occurred" },
    { body: "Sign in to Vercel" }, { errors: ["Hydration failed"] },
  ]) assert.throws(() => assertCaptureDocument({ ...valid, ...change }, PAGES[0]))
})
test("screenshot failures propagate and never leave a successful capture file", async () => {
  const dir = await mkdtemp(join(tmpdir(), "lucci-screenshot-"))
  try {
    await assert.rejects(() => saveCapture({ screenshot: async () => { throw new Error("Browser capture failed") } }, join(dir, "capture.png")), /Browser capture failed/)
    await assert.rejects(() => saveCapture({ screenshot: async () => Buffer.from("not an image") }, join(dir, "capture.png")), /did not produce a PNG/)
    assert.deepEqual(await readdir(dir), [])
  } finally { await rm(dir, { recursive: true, force: true }) }
})

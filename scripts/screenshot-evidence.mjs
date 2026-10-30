import assert from "node:assert/strict"
import { writeFile } from "node:fs/promises"

// Fixed local production build only: never accepts a PR-supplied preview/login URL.
export const ORIGIN = "http://127.0.0.1:3183"
export const PAGES = [
  { name: "home", path: "/", heading: "Lucci Labs" },
  { name: "writing", path: "/writing", heading: "Open questions, methods, and what the work made clear." },
  { name: "published-article", path: "/writing/portable-context", heading: "Portable context" },
  { name: "privacy", path: "/privacy", heading: "Privacy policy" },
]
export function assertCaptureDocument({ status, url, heading, body, errors = [] }, page) {
  assert.equal(status, 200, "The candidate page must return HTTP 200")
  assert.equal(url, ORIGIN + page.path, "Unexpected redirect: screenshot is not the requested local candidate")
  assert.equal(heading, page.heading, "Expected candidate content missing: refusing a login, error or wrong page")
  assert.doesNotMatch(body, /Application error:|Internal Server Error|This deployment is protected|Sign in to Vercel/i)
  assert.deepEqual(errors, [], "Client-side exceptions must fail screenshot evidence")
}
export async function saveCapture(page, path) {
  const png = await page.screenshot({ fullPage: true, animations: "disabled", type: "png" })
  assert.ok(png.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])), "Screenshot did not produce a PNG")
  await writeFile(path, png)
}

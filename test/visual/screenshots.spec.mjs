import { test, expect } from "@playwright/test"
import { mkdir, writeFile } from "node:fs/promises"
import { execFileSync } from "node:child_process"
import { ORIGIN, PAGES, assertCaptureDocument, saveCapture } from "../../scripts/screenshot-evidence.mjs"

for (const entry of PAGES) {
  test(`${entry.name}: local CI build evidence`, async ({ page, context }, info) => {
    // This is a static capture, never a form submission or production request.
    await context.route("**/*", (route) => new URL(route.request().url()).origin === ORIGIN && route.request().method() === "GET" && !new URL(route.request().url()).pathname.startsWith("/api/") ? route.continue() : route.abort())
    const errors = []
    page.on("pageerror", (error) => errors.push(error.message))
    const response = await page.goto(entry.path, { waitUntil: "networkidle" })
    await expect(page.locator("h1")).toHaveText(entry.heading)
    await page.evaluate(async () => {
      await document.fonts.ready
      // Load below-fold local imagery before the full-page still. Reduced-motion
      // is a supported site presentation, not injected replacement CSS.
      for (let y = 0; y < Math.min(document.documentElement.scrollHeight, 20000); y += innerHeight) {
        scrollTo(0, y)
        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
      }
      scrollTo(0, 0)
    })
    await expect.poll(() => page.evaluate(() => [...document.images].every((image) => image.complete && image.naturalWidth > 0))).toBe(true)
    assertCaptureDocument({ status: response?.status(), url: page.url(), heading: (await page.locator("h1").textContent()).trim(), body: await page.locator("body").innerText(), errors }, entry)
    await mkdir("ci-preview", { recursive: true })
    const filename = `${info.project.name}-${entry.name}.png`
    await saveCapture(page, `ci-preview/${filename}`)
    // A per-capture receipt exists only after a verified PNG was saved.
    await writeFile(`ci-preview/${info.project.name}-${entry.name}.json`, JSON.stringify({
      evidence: "CI local Next production build; not deployed Vercel preview proof",
      candidate_head: process.env.CANDIDATE_HEAD || null,
      checkout_commit: execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim(),
      page: entry.path, viewport: info.project.use.viewport, reduced_motion: true, screenshot: filename,
    }, null, 2))
  })
}

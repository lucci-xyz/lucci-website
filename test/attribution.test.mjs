import assert from "node:assert/strict"
import { test } from "node:test"
import { captureAttribution, normalizeAttribution, formatAttribution } from "../lib/attribution.ts"

function storage() {
  const values = new Map()
  return {
    getItem: (key) => values.get(key) || null,
    setItem: (key, value) => values.set(key, value),
  }
}

const start = Date.UTC(2026, 9, 24, 12)

test("keeps first and latest tagged campaigns through untagged visits", () => {
  const store = storage()
  const first = captureAttribution("https://luccihq.com/?utm_source=linkedin&utm_medium=social&utm_campaign=launch", "https://www.linkedin.com/feed/", store, start)
  assert.equal(first.first.utm_source, "linkedin")
  assert.equal(first.first.referrer_host, "www.linkedin.com")
  const untagged = captureAttribution("https://luccihq.com/contact?need=private", "", store, start + 1000)
  assert.deepEqual(untagged, first)
  const second = captureAttribution("https://luccihq.com/about?utm_source=x&utm_content=profile", "", store, start + 2000)
  assert.equal(second.first.utm_source, "linkedin")
  assert.equal(second.last.utm_source, "x")
  assert.equal(second.last.landing_path, "/about")
  assert.ok(!formatAttribution(second).includes("private"))
})

test("captures every supported UTM field without arbitrary query data", () => {
  const store = storage()
  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_id", "utm_term", "utm_content", "utm_source_platform", "utm_creative_format", "utm_marketing_tactic"]
  const query = keys.map((key) => `${key}=sample`).join("&")
  const result = captureAttribution(`https://luccilabs.xyz/writing?${query}&email=private@example.com`, "", store, start)
  for (const key of keys) assert.equal(result.last[key], "sample")
  assert.ok(!JSON.stringify(result).includes("private@example.com"))
  assert.deepEqual(normalizeAttribution(result), result)
})

test("expires old attribution and rejects malformed payloads", () => {
  const store = storage()
  captureAttribution("https://luccihq.com/?utm_source=github", "", store, start)
  assert.equal(captureAttribution("https://luccihq.com/", "", store, start + 91 * 86400000), null)
  assert.equal(normalizeAttribution({ first: { utm_source: "x" }, last: {} }), null)
})

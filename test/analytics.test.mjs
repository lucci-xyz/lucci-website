import assert from "node:assert/strict"
import { test } from "node:test"
import { analyticsContext, recordConfirmation, createGoogleTag } from "../lib/analytics.ts"

test("analytics defaults exclude private URL and referrer data", () => {
  const result = analyticsContext("https://luccilabs.xyz/subscribe/confirm?token=private-token&utm_source=linkedin&utm_campaign=research&email=person@example.com#secret", "https://example.com/private/path?email=person@example.com")
  assert.deepEqual(result, { page_location: "https://luccilabs.xyz/subscribe/confirm?utm_source=linkedin&utm_campaign=research", page_referrer: "https://example.com/" })
  assert.ok(!JSON.stringify(result).includes("private"))
  assert.ok(!JSON.stringify(result).includes("person@"))
  assert.equal(analyticsContext("https://luccihq.com/contact?utm_source=person%40example.com&need=confidential", "javascript:alert(1)").page_location, "https://luccihq.com/contact")
  assert.equal(analyticsContext("https://luccihq.com/", "not a URL").page_referrer, "")
})

test("confirmed signup events require consent and deduplicate a signed receipt", () => {
  const values = new Map(); const store = { getItem: k => values.get(k) || null, setItem: (k,v) => values.set(k,v) }
  let sent = 0; const send = () => { sent++; return true }; const id = "a".repeat(64)
  assert.equal(recordConfirmation(id, "no", store, send), false)
  assert.equal(recordConfirmation("forged", "yes", store, send), false)
  assert.equal(recordConfirmation(id, "yes", store, () => false), false)
  assert.equal(recordConfirmation(id, "yes", store, send), true)
  assert.equal(recordConfirmation(id, "yes", store, send), false)
  assert.equal(sent, 1)
  assert.equal(recordConfirmation("b".repeat(64), "yes", { getItem() { throw Error("blocked") }, setItem() {} }, send), false)
})

test("browser-wide receipt ledger expires old entries and remains bounded", () => {
  const values = new Map(); const store = { getItem: k => values.get(k) || null, setItem: (k,v) => values.set(k,v) }
  const id = "c".repeat(64), now = Date.UTC(2026, 9, 25)
  assert.equal(recordConfirmation(id, "yes", store, () => true, now), true)
  const secondTab = { ...store }
  assert.equal(recordConfirmation(id, "yes", secondTab, () => true, now + 1000), false)
  assert.equal(recordConfirmation(id, "yes", secondTab, () => true, now + 49 * 3600000), true)
  for (let n = 0; n < 100; n++) recordConfirmation(n.toString(16).padStart(64, "0"), "yes", store, () => true, now + 50 * 3600000 + n)
  assert.equal(values.size, 1)
  assert.ok(JSON.parse([...values.values()][0]).length <= 64)
})

test("Google tag commands retain the documented Arguments queue format", () => {
  const queue = [{ existing: "preserved" }]
  const gtag = createGoogleTag(queue)
  const started = new Date("2026-10-25T12:00:00Z")
  const config = { send_page_view: false, page_location: "https://example.org/" }
  const event = { method: "email" }
  gtag("js", started)
  gtag("config", "G-EXAMPLE", config)
  gtag("event", "sign_up", event)
  assert.deepEqual(queue[0], { existing: "preserved" })
  assert.equal(queue.length, 4)
  for (const entry of queue.slice(1)) {
    assert.equal(Object.prototype.toString.call(entry), "[object Arguments]")
    assert.equal(Array.isArray(entry), false)
  }
  assert.deepEqual(Array.from(queue[1]), ["js", started])
  assert.deepEqual(Array.from(queue[2]), ["config", "G-EXAMPLE", config])
  assert.deepEqual(Array.from(queue[3]), ["event", "sign_up", event])
  assert.equal(queue[1][1], started)
  assert.equal(queue[2][2], config)
  assert.equal(queue[3][2], event)
})

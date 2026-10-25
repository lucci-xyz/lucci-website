import assert from "node:assert/strict"
import { test } from "node:test"
import { analyticsContext, recordConfirmation } from "../lib/analytics.ts"

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

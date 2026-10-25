import assert from "node:assert/strict"
import { test } from "node:test"
import { confirmationToken, emailFromToken, normalizeEmail, subscriptionFromToken } from "../lib/research-subscriptions.ts"

const day = Date.UTC(2026, 9, 24, 12)
const secret = "test-secret-that-is-not-used-in-production"

test("a signed confirmation accepts the same address within its lifetime", () => {
  const token = confirmationToken("reader@example.com", secret, day)
  assert.equal(emailFromToken(token, secret, day + 60_000), "reader@example.com")
  assert.equal(confirmationToken("reader@example.com", secret, day + 60_000), token)
})

test("tampered, expired, and foreign-secret tokens are rejected", () => {
  const token = confirmationToken("reader@example.com", secret, day)
  assert.equal(emailFromToken(`${token}x`, secret, day), null)
  assert.equal(emailFromToken(token, "another-secret", day), null)
  assert.equal(emailFromToken(token, secret, day + 3 * 24 * 60 * 60 * 1000), null)
})

test("campaign details survive the signed confirmation without arbitrary query data", () => {
  const attribution = {
    first: { utm_source: "linkedin", utm_medium: "social", landing_path: "/", captured_at: new Date(day).toISOString() },
    last: { utm_source: "x", utm_campaign: "research", landing_path: "/writing", captured_at: new Date(day).toISOString(), unknown: "private" },
  }
  const token = confirmationToken("reader@example.com", secret, day, attribution)
  const result = subscriptionFromToken(token, secret, day)
  assert.equal(result.email, "reader@example.com")
  assert.equal(result.attribution.first.utm_source, "linkedin")
  assert.equal(result.attribution.last.utm_source, "x")
  assert.ok(!JSON.stringify(result).includes("private"))
  assert.equal(subscriptionFromToken(`${token}x`, secret, day), null)
})

test("email input is normalized and rejects invalid or oversized addresses", () => {
  assert.equal(normalizeEmail("  Reader@Example.com "), "reader@example.com")
  assert.equal(normalizeEmail("not-an-address"), null)
  assert.equal(normalizeEmail("a".repeat(255) + "@example.com"), null)
})

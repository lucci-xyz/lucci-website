import assert from "node:assert/strict"
import { test } from "node:test"
import { confirmationReceipt, confirmationReceiptId } from "../lib/subscription-analytics.ts"
const secret = "test-secret-that-is-at-least-thirty-two-characters"
const now = Date.UTC(2026, 9, 25)
test("only signed unexpired confirmation receipts permit browser measurement", () => {
  const receipt = confirmationReceipt("private-signup-token", secret, now)
  const id = confirmationReceiptId(receipt, secret, now)
  assert.match(id, /^[a-f0-9]{64}$/)
  assert.equal(confirmationReceiptId(receipt, "wrong secret", now), null)
  assert.equal(confirmationReceiptId(receipt + "x", secret, now), null)
  assert.equal(confirmationReceiptId(receipt, secret, now + 11 * 60 * 1000), null)
  assert.equal(confirmationReceiptId(receipt, secret, now - 1000), null)
  assert.equal(confirmationReceiptId(undefined, secret, now), null)
  assert.ok(!Buffer.from(receipt.split(".")[0], "base64url").toString().includes("private-signup-token"))
  assert.equal(id, confirmationReceiptId(confirmationReceipt("private-signup-token", secret, now + 1000), secret, now + 1000))
})

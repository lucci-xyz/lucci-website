import { createHmac, timingSafeEqual } from "node:crypto"

export const CONFIRMATION_RECEIPT_COOKIE = "lucci_research_confirmation"
export const CONFIRMATION_RECEIPT_SECONDS = 600

// A short-lived proof of a successful confirmation, with no address or token.
export function confirmationReceipt(token: string, secret: string, now = Date.now(), consent: unknown = null): string | null {
  if (consent !== "yes") return null
  const id = createHmac("sha256", secret).update(`analytics:${token}`).digest("hex")
  const payload = Buffer.from(JSON.stringify({ id, issued: now, expires: now + CONFIRMATION_RECEIPT_SECONDS * 1000 })).toString("base64url")
  return `${payload}.${createHmac("sha256", secret).update(payload).digest("base64url")}`
}

export function confirmationReceiptId(receipt: string | undefined, secret: string, now = Date.now()): string | null {
  if (!receipt || receipt.length > 500) return null
  const [payload, signature, extra] = receipt.split(".")
  if (!payload || !signature || extra) return null
  const expected = createHmac("sha256", secret).update(payload).digest()
  const supplied = Buffer.from(signature, "base64url")
  if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) return null
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { id: unknown; issued: unknown; expires: unknown }
    if (typeof data.id !== "string" || !/^[a-f0-9]{64}$/.test(data.id) || typeof data.issued !== "number" || typeof data.expires !== "number") return null
    if (!Number.isFinite(data.issued) || data.issued > now || data.expires <= now || data.expires - data.issued !== CONFIRMATION_RECEIPT_SECONDS * 1000) return null
    return data.id
  } catch { return null }
}

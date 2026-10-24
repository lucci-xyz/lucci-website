import { createHmac, timingSafeEqual } from "node:crypto"

const DAY = 24 * 60 * 60 * 1000

export function normalizeEmail(value: unknown): string | null {
  if (typeof value !== "string") return null
  const email = value.trim().toLowerCase()
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null
  return email
}

export function confirmationToken(email: string, secret: string, now = Date.now()): string {
  // A fixed daily timestamp makes repeated requests produce the same confirmation link.
  const day = Math.floor(now / DAY)
  const payload = Buffer.from(JSON.stringify({ email, day })).toString("base64url")
  const signature = createHmac("sha256", secret).update(payload).digest("base64url")
  return `${payload}.${signature}`
}

export function emailFromToken(token: string, secret: string, now = Date.now()): string | null {
  const [payload, signature, extra] = token.split(".")
  if (!payload || !signature || extra || token.length > 600) return null
  const expected = createHmac("sha256", secret).update(payload).digest()
  let supplied: Buffer
  try {
    supplied = Buffer.from(signature, "base64url")
  } catch {
    return null
  }
  if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) return null
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { email?: unknown; day?: unknown }
    const email = normalizeEmail(data.email)
    if (!email || data.email !== email || !Number.isInteger(data.day)) return null
    const age = now - Number(data.day) * DAY
    if (age < 0 || age > 2 * DAY) return null
    return email
  } catch {
    return null
  }
}

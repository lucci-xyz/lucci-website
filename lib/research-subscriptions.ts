import { createHmac, timingSafeEqual } from "node:crypto"
import { normalizeAttribution, UTM_KEYS, type Attribution, type CampaignTouch } from "./attribution.ts"

const DAY = 24 * 60 * 60 * 1000

export function normalizeEmail(value: unknown): string | null {
  if (typeof value !== "string") return null
  const email = value.trim().toLowerCase()
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null
  return email
}

function compactTouch(value: CampaignTouch): CampaignTouch {
  const result: CampaignTouch = {
    landing_path: value.landing_path.slice(0, 80),
    captured_at: value.captured_at,
  }
  if (value.referrer_host) result.referrer_host = value.referrer_host.slice(0, 80)
  for (const key of UTM_KEYS) if (value[key]) result[key] = value[key]!.slice(0, 50)
  return result
}

export function compactAttribution(value: unknown): Attribution | null {
  const attribution = normalizeAttribution(value)
  return attribution ? { first: compactTouch(attribution.first), last: compactTouch(attribution.last) } : null
}

export function confirmationToken(email: string, secret: string, now = Date.now(), attribution?: unknown): string {
  // A daily timestamp bounds token lifetime; the separate send key remains stable per address/day.
  const day = Math.floor(now / DAY)
  const campaign = compactAttribution(attribution)
  const payload = Buffer.from(JSON.stringify({ email, day, ...(campaign ? { attribution: campaign } : {}) })).toString("base64url")
  const signature = createHmac("sha256", secret).update(payload).digest("base64url")
  return `${payload}.${signature}`
}

export function subscriptionFromToken(token: string, secret: string, now = Date.now()): { email: string; attribution: Attribution | null } | null {
  const [payload, signature, extra] = token.split(".")
  if (!payload || !signature || extra || token.length > 3000) return null
  const expected = createHmac("sha256", secret).update(payload).digest()
  let supplied: Buffer
  try {
    supplied = Buffer.from(signature, "base64url")
  } catch {
    return null
  }
  if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) return null
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { email?: unknown; day?: unknown; attribution?: unknown }
    const email = normalizeEmail(data.email)
    if (!email || data.email !== email || !Number.isInteger(data.day)) return null
    const age = now - Number(data.day) * DAY
    if (age < 0 || age > 2 * DAY) return null
    return { email, attribution: compactAttribution(data.attribution) }
  } catch {
    return null
  }
}

export function emailFromToken(token: string, secret: string, now = Date.now()): string | null {
  return subscriptionFromToken(token, secret, now)?.email || null
}

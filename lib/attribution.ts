// Campaign details only. Never save a full referring URL or an arbitrary query string.
export const UTM_KEYS = [
  "utm_source", "utm_medium", "utm_campaign", "utm_id", "utm_term",
  "utm_content", "utm_source_platform", "utm_creative_format", "utm_marketing_tactic",
] as const

type UtmKey = (typeof UTM_KEYS)[number]
export type CampaignTouch = Partial<Record<UtmKey, string>> & {
  landing_path: string
  captured_at: string
  referrer_host?: string
}
export type Attribution = { first: CampaignTouch; last: CampaignTouch }

const STORAGE_KEY = "lucci_campaign_v1"
const MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000

function clean(value: unknown, limit: number): string {
  if (typeof value !== "string" || /\S+@\S+\.\S+/.test(value)) return ""
  return value.replace(/[\u0000-\u001f\u007f]/g, "").trim().slice(0, limit)
}

function touch(value: unknown): CampaignTouch | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null
  const input = value as Record<string, unknown>
  const result: CampaignTouch = {
    landing_path: clean(input.landing_path, 200),
    captured_at: clean(input.captured_at, 40),
  }
  if (!result.landing_path.startsWith("/") || !Number.isFinite(Date.parse(result.captured_at))) return null
  const referrer = clean(input.referrer_host, 100)
  if (referrer) result.referrer_host = referrer
  for (const key of UTM_KEYS) {
    const value = clean(input[key], 120)
    if (value) result[key] = value
  }
  return UTM_KEYS.some((key) => result[key]) ? result : null
}

export function normalizeAttribution(value: unknown): Attribution | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null
  const input = value as Record<string, unknown>
  const first = touch(input.first)
  const last = touch(input.last)
  return first && last ? { first, last } : null
}

export function captureAttribution(
  href: string,
  referrer: string,
  storage: Pick<Storage, "getItem" | "setItem">,
  now = Date.now(),
): Attribution | null {
  const url = new URL(href)
  let previous: Attribution | null = null
  try { previous = normalizeAttribution(JSON.parse(storage.getItem(STORAGE_KEY) || "null")) } catch { /* Storage may be disabled. */ }
  if (previous && now - Date.parse(previous.first.captured_at) > MAX_AGE_MS) {
    previous = null
    try { storage.setItem(STORAGE_KEY, "null") } catch { /* Storage may be disabled. */ }
  }

  const values: Partial<Record<UtmKey, string>> = {}
  for (const key of UTM_KEYS) {
    const value = clean(url.searchParams.get(key), 120)
    if (value) values[key] = value
  }
  if (!UTM_KEYS.some((key) => values[key])) return previous

  let referrerHost = ""
  try {
    const host = new URL(referrer).hostname
    if (host !== url.hostname) referrerHost = clean(host, 100)
  } catch { /* Direct visit. */ }
  const current: CampaignTouch = {
    ...values,
    landing_path: clean(url.pathname, 200) || "/",
    captured_at: new Date(now).toISOString(),
    ...(referrerHost ? { referrer_host: referrerHost } : {}),
  }
  const result = { first: previous?.first || current, last: current }
  try { storage.setItem(STORAGE_KEY, JSON.stringify(result)) } catch { /* Current URL is still captured. */ }
  return result
}

export function browserAttribution(): Attribution | null {
  if (typeof window === "undefined") return null
  try { return captureAttribution(window.location.href, document.referrer, window.localStorage) } catch {
    // Private browsing can deny access to localStorage while still allowing the current campaign.
    const memory = { getItem: () => null, setItem: () => undefined }
    try { return captureAttribution(window.location.href, document.referrer, memory) } catch { return null }
  }
}

export function formatAttribution(value: unknown): string {
  const attribution = normalizeAttribution(value)
  if (!attribution) return ""
  const lines = (label: string, data: CampaignTouch) => [
    label,
    ...UTM_KEYS.filter((key) => data[key]).map((key) => `${key}: ${data[key]}`),
    `landing_path: ${data.landing_path}`,
    ...(data.referrer_host ? [`referrer_host: ${data.referrer_host}`] : []),
    `captured_at: ${data.captured_at}`,
  ]
  return [...lines("First tagged visit", attribution.first), "", ...lines("Latest tagged visit", attribution.last)].join("\n")
}

import { UTM_KEYS } from "./attribution.ts"

export const ANALYTICS_CHOICE_KEY = "lucci_analytics_choice_v1"

// Apply these defaults to every event, including automatic engagement events.
export function analyticsContext(href: string, referrer: string) {
  const url = new URL(href)
  const query = new URLSearchParams()
  for (const key of UTM_KEYS) {
    const value = url.searchParams.get(key)
    if (value && !/\S+@\S+\.\S+/.test(value)) query.set(key, value.replace(/[\u0000-\u001f\u007f]/g, "").slice(0, 120))
  }
  let source = ""
  try {
    const referred = new URL(referrer)
    if (referred.protocol === "https:" || referred.protocol === "http:") source = `${referred.origin}/`
  } catch { /* Direct or unavailable referrer. */ }
  return { page_location: `${url.origin}${url.pathname}${query.size ? `?${query}` : ""}`, page_referrer: source }
}

// The server verifies the receipt. Opaque IDs stay local, never in GA4.
// One bounded browser-wide ledger deduplicates tabs for the token's lifetime.
export function recordConfirmation(id: string, choice: string | null, storage: Pick<Storage, "getItem" | "setItem">, send: () => boolean, now = Date.now()): boolean {
  if (choice !== "yes" || !/^[a-f0-9]{64}$/.test(id)) return false
  const key = "lucci_confirmed_receipts_v1"
  try {
    const stored = storage.getItem(key)
    let raw: unknown = null
    try { raw = JSON.parse(stored || "null") } catch { /* Start a valid ledger. */ }
    const records: { id: string; at: number }[] = Array.isArray(raw) ? raw.filter((item): item is { id: string; at: number } =>
      !!item && typeof item === "object" && typeof item.id === "string" && /^[a-f0-9]{64}$/.test(item.id) &&
      typeof item.at === "number" && item.at <= now && now - item.at < 48 * 3600000).slice(-63) : []
    if (records.some(item => item.id === id)) return false
    storage.setItem(key, JSON.stringify([...records, { id, at: now }]))
    let sent = false
    try { sent = send() } finally { if (!sent) storage.setItem(key, JSON.stringify(records)) }
    return sent
  } catch { return false }
}

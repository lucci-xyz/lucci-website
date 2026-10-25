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

// The receipt is verified on the server. It is used only for local deduplication,
// and is never sent to an analytics provider as an identifier.
export function recordConfirmation(id: string, choice: string | null, storage: Pick<Storage, "getItem" | "setItem">, send: () => boolean): boolean {
  if (choice !== "yes" || !/^[a-f0-9]{64}$/.test(id)) return false
  const key = `lucci_confirmed_${id}`
  try {
    if (storage.getItem(key)) return false
    storage.setItem(key, "pending")
    let sent = false
    try { sent = send() } finally { storage.setItem(key, sent ? "sent" : "") }
    return sent
  } catch { return false }
}

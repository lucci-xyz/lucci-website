import { normalizeAttribution, type Attribution } from "./attribution.ts"

// The Resend automation "Research subscription welcome" sends the research-subscription-welcome
// template when this event arrives. Automation emails fill in {{{RESEND_UNSUBSCRIBE_URL}}}.
export const RESEARCH_WELCOME_EVENT = "research.subscribed"

export type ResearchListSettings = { key: string; segment: string; attributionProperty?: string }

// "subscribed" means the address joined the segment on this request; only that outcome earns a welcome.
// "busy" means a concurrent request is creating the same contact and will finish the subscription.
export type SubscribeOutcome = "subscribed" | "already" | "unsubscribed" | "busy"

function api(settings: ResearchListSettings) {
  const headers = { Authorization: `Bearer ${settings.key}`, "Content-Type": "application/json" }
  return (path: string, init: RequestInit = {}) => fetch(`https://api.resend.com${path}`, { ...init, headers, cache: "no-store" })
}

export async function addResearchSubscriber(email: string, attribution: Attribution | null, settings: ResearchListSettings): Promise<SubscribeOutcome> {
  const call = api(settings)
  const contactPath = `/contacts/${encodeURIComponent(email)}`

  async function saveAttribution(previousValue?: unknown) {
    if (!attribution || !settings.attributionProperty) return
    let previous = null
    try { previous = normalizeAttribution(JSON.parse(typeof previousValue === "string" ? previousValue : "null")) } catch { /* No earlier campaign. */ }
    const value = { first: previous?.first || attribution.first, last: attribution.last }
    const updated = await call(contactPath, {
      method: "PATCH",
      body: JSON.stringify({ properties: { [settings.attributionProperty]: JSON.stringify(value) } }),
    })
    if (!updated.ok) console.error("research attribution update failed", updated.status)
  }

  const existing = await call(contactPath)
  if (existing.ok) {
    const contact = (await existing.json()) as { id?: string; unsubscribed?: boolean; properties?: Record<string, unknown> }
    // Never silently override a prior global unsubscribe.
    if (contact.unsubscribed) return "unsubscribed"
    const memberships = await call(`/contacts/${encodeURIComponent(contact.id || email)}/segments`)
    if (!memberships.ok) throw new Error(`segments: ${memberships.status}`)
    const { data } = (await memberships.json()) as { data?: { id?: string }[] }
    const member = Array.isArray(data) && data.some(item => item.id === settings.segment)
    if (!member) {
      const added = await call(`${contactPath}/segments/${encodeURIComponent(settings.segment)}`, { method: "POST" })
      if (!added.ok && added.status !== 409) throw new Error(`segment: ${added.status}`)
    }
    try { await saveAttribution(settings.attributionProperty ? contact.properties?.[settings.attributionProperty] : undefined) } catch { console.error("research attribution update unavailable") }
    return member ? "already" : "subscribed"
  }
  if (existing.status !== 404) throw new Error(`lookup: ${existing.status}`)

  const created = await call("/contacts", {
    method: "POST",
    body: JSON.stringify({ email, unsubscribed: false, segments: [{ id: settings.segment }] }),
  })
  // A concurrent request may have created the contact already.
  if (created.status === 409) return "busy"
  if (!created.ok) throw new Error(`contact: ${created.status}`)
  try { await saveAttribution() } catch { console.error("research attribution update unavailable") }
  return "subscribed"
}

// The subscription already stands, so a failed welcome is logged rather than reported to the visitor.
export async function welcomeResearchSubscriber(email: string, settings: ResearchListSettings): Promise<boolean> {
  try {
    const sent = await api(settings)("/events/send", {
      method: "POST",
      body: JSON.stringify({ event: RESEARCH_WELCOME_EVENT, email }),
    })
    if (!sent.ok) console.error("research welcome event failed", sent.status)
    return sent.ok
  } catch {
    console.error("research welcome event unavailable")
    return false
  }
}

import { NextResponse } from "next/server"
import { compactAttribution, normalizeEmail } from "@/lib/research-subscriptions"
import { addResearchSubscriber, welcomeResearchSubscriber } from "@/lib/research-list"

export const runtime = "nodejs"

function json(error: string, status: number) {
  return NextResponse.json({ error }, { status, headers: { "Cache-Control": "no-store" } })
}

// Every accepted request gets the same reply, so the form never reveals whether an address was already listed.
function accepted() {
  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } })
}

export async function POST(request: Request) {
  const raw = await request.text()
  if (raw.length > 4000) return json("The request is too large.", 413)

  let body: { email?: unknown; website?: unknown; attribution?: unknown }
  try {
    body = JSON.parse(raw) as typeof body
  } catch {
    return json("The request could not be read.", 400)
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) return json("The request could not be read.", 400)

  // The hidden field catches basic form bots without exposing a subscriber address.
  if (typeof body.website === "string" && body.website.trim()) return accepted()

  const email = normalizeEmail(body.email)
  if (!email) return json("Add a valid email address.", 400)

  const key = process.env.RESEND_RESEARCH_API_KEY
  const segment = process.env.RESEND_RESEARCH_SEGMENT_ID
  if (!key || !segment) return json("Signups are temporarily unavailable.", 503)
  const settings = { key, segment, attributionProperty: process.env.RESEND_RESEARCH_ATTRIBUTION_PROPERTY }

  try {
    // Sign-up is single opt-in: the address joins the segment now, and only a new member gets the welcome.
    const outcome = await addResearchSubscriber(email, compactAttribution(body.attribution), settings)
    if (outcome === "subscribed") await welcomeResearchSubscriber(email, settings)
  } catch (error) {
    console.error("research signup failed", error instanceof Error ? error.message : "unknown")
    return json("We could not subscribe you. Try again later.", 502)
  }
  return accepted()
}

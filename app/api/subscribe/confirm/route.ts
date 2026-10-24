import { NextResponse } from "next/server"
import { emailFromToken } from "@/lib/research-subscriptions"

export const runtime = "nodejs"

function destination(request: Request, status: string) {
  return NextResponse.redirect(new URL(`/subscribe/confirmed?status=${status}`, request.url), 303)
}

export async function POST(request: Request) {
  const form = await request.formData()
  const token = form.get("token")
  const key = process.env.RESEND_RESEARCH_API_KEY
  const secret = process.env.RESEARCH_SIGNUP_SECRET
  const segment = process.env.RESEND_RESEARCH_SEGMENT_ID
  if (!key || !secret || secret.length < 32 || !segment) return destination(request, "unavailable")
  const email = typeof token === "string" ? emailFromToken(token, secret) : null
  if (!email) return destination(request, "expired")

  const headers = { Authorization: `Bearer ${key}`, "Content-Type": "application/json" }
  const contactUrl = `https://api.resend.com/contacts/${encodeURIComponent(email)}`

  try {
    const existing = await fetch(contactUrl, { headers, cache: "no-store" })
    if (existing.ok) {
      const contact = (await existing.json()) as { unsubscribed?: boolean }
      // Never silently override a prior global unsubscribe.
      if (contact.unsubscribed) return destination(request, "unsubscribed")
      const added = await fetch(`${contactUrl}/segments/${encodeURIComponent(segment)}`, {
        method: "POST", headers, cache: "no-store",
      })
      if (!added.ok && added.status !== 409) throw new Error(`segment: ${added.status}`)
    } else if (existing.status === 404) {
      const created = await fetch("https://api.resend.com/contacts", {
        method: "POST", headers, cache: "no-store",
        body: JSON.stringify({ email, unsubscribed: false, segments: [{ id: segment }] }),
      })
      // A concurrent confirmation may have created the contact already.
      if (created.status === 409) return destination(request, "unavailable")
      if (!created.ok) throw new Error(`contact: ${created.status}`)
    } else {
      throw new Error(`lookup: ${existing.status}`)
    }
  } catch (error) {
    console.error("research signup confirmation failed", error instanceof Error ? error.message : "unknown")
    return destination(request, "unavailable")
  }

  return destination(request, "confirmed")
}

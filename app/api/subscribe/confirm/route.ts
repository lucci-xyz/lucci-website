import { NextResponse } from "next/server"
import { subscriptionFromToken } from "@/lib/research-subscriptions"
import { addResearchSubscriber, welcomeResearchSubscriber } from "@/lib/research-list"
import { confirmationReceipt, CONFIRMATION_RECEIPT_COOKIE, CONFIRMATION_RECEIPT_SECONDS } from "@/lib/subscription-analytics"

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
  const subscription = typeof token === "string" ? subscriptionFromToken(token, secret) : null
  if (!subscription) return destination(request, "expired")
  const { email, attribution } = subscription
  const settings = { key, segment, attributionProperty: process.env.RESEND_RESEARCH_ATTRIBUTION_PROPERTY }

  // Links emailed before sign-up became single opt-in still finish here until they expire.
  try {
    const outcome = await addResearchSubscriber(email, attribution, settings)
    if (outcome === "unsubscribed") return destination(request, "unsubscribed")
    if (outcome === "busy") return destination(request, "unavailable")
    if (outcome === "subscribed") await welcomeResearchSubscriber(email, settings)
  } catch (error) {
    console.error("research signup confirmation failed", error instanceof Error ? error.message : "unknown")
    return destination(request, "unavailable")
  }

  const response = destination(request, "confirmed")
  const receipt = confirmationReceipt(token as string, secret, Date.now(), form.get("analytics_consent"))
  response.cookies.set(CONFIRMATION_RECEIPT_COOKIE, receipt || "", {
    httpOnly: true, secure: true, sameSite: "lax", path: "/subscribe/confirmed", maxAge: receipt ? CONFIRMATION_RECEIPT_SECONDS : 0,
  })
  return response
}

import { createHash } from "node:crypto"
import { NextResponse } from "next/server"
import { confirmationToken, normalizeEmail } from "@/lib/research-subscriptions"

export const runtime = "nodejs"

function json(error: string, status: number) {
  return NextResponse.json({ error }, { status, headers: { "Cache-Control": "no-store" } })
}

export async function POST(request: Request) {
  const raw = await request.text()
  if (raw.length > 2000) return json("The request is too large.", 413)

  let body: { email?: unknown; website?: unknown }
  try {
    body = JSON.parse(raw) as typeof body
  } catch {
    return json("The request could not be read.", 400)
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) return json("The request could not be read.", 400)

  // The hidden field catches basic form bots without exposing a subscriber address.
  if (typeof body.website === "string" && body.website.trim()) return NextResponse.json({ ok: true })

  const email = normalizeEmail(body.email)
  if (!email) return json("Add a valid email address.", 400)

  const key = process.env.RESEND_RESEARCH_API_KEY
  const secret = process.env.RESEARCH_SIGNUP_SECRET
  if (!key || !secret || secret.length < 32) return json("Signups are temporarily unavailable.", 503)

  const token = confirmationToken(email, secret)
  const site = process.env.RESEARCH_SITE_URL || "https://luccilabs.xyz"
  const confirmUrl = new URL("/subscribe/confirm", site)
  confirmUrl.searchParams.set("token", token)
  const text = `Confirm your Lucci Labs research subscription: ${confirmUrl.toString()}\n\nThe link expires within 48 hours. If you did not request this, ignore this email. Research updates are occasional, and every update includes an unsubscribe link.`
  const idempotency = createHash("sha256").update(token).digest("hex")
  const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="IE=edge"><title>Confirm your Lucci Labs research subscription</title></head><body style="margin:0;background-color:#ffffff;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" bgcolor="#ffffff" style="background-color:#ffffff;padding-top:32px;padding-right:20px;padding-bottom:32px;padding-left:20px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;"><tr><td><h1 style="font-family:Arial,Helvetica,sans-serif;font-size:24px;line-height:32px;color:#282828;font-weight:600;">Confirm your subscription</h1><p style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:25px;color:#3c3836;">Receive occasional emails when Lucci Labs publishes new research.</p><p style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:25px;color:#3c3836;"><a href="${confirmUrl.toString()}" style="color:#282828;text-decoration:underline;">Confirm subscription</a></p><p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:#676767;">This link expires within 48 hours. If you did not request this, ignore this email. Every research update includes an unsubscribe link.</p></td></tr></table></td></tr></table></body></html>`

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `research-confirm/${idempotency}`,
      },
      body: JSON.stringify({
        from: "Lucci Labs <research@luccilabs.xyz>",
        to: [email],
        reply_to: "contact@luccilabs.xyz",
        subject: "Confirm your Lucci Labs research subscription",
        text,
        html,
      }),
      cache: "no-store",
    })
    if (!response.ok) {
      console.error("research signup confirmation failed", response.status)
      return json("We could not send the confirmation email. Try again later.", 502)
    }
  } catch {
    return json("We could not send the confirmation email. Try again later.", 502)
  }

  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } })
}

import { cookies } from "next/headers"
import { confirmationReceiptId, CONFIRMATION_RECEIPT_COOKIE } from "@/lib/subscription-analytics"
import { ConfirmedSubscriptionEvent } from "@/components/confirmed-subscription-event"
import Link from "next/link"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

const messages: Record<string, string> = {
  confirmed: "You're subscribed. We'll email you when new research is ready.",
  expired: "This confirmation link has expired or is invalid. Please sign up again.",
  unsubscribed: "This address was previously unsubscribed. Email us if you'd like help rejoining.",
  unavailable: "We couldn't finish your subscription just now. Please try again later.",
}

export default async function ConfirmedPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status } = await searchParams
  const secret = process.env.RESEARCH_SIGNUP_SECRET
  const receiptId = status === "confirmed" && secret
    ? confirmationReceiptId((await cookies()).get(CONFIRMATION_RECEIPT_COOKIE)?.value, secret)
    : null
  return (
    <div className="shell" id="top">
      <SiteHeader />
      {receiptId && <ConfirmedSubscriptionEvent receiptId={receiptId} />}
      <main className="subscribe-confirm-page">
        <p className="eyebrow">Lucci Labs research</p>
        <h1>{status === "confirmed" ? "You're on the list." : "Subscription update"}</h1>
        <p>{messages[status || ""] || messages.unavailable}</p>
        <Link className="quiet-link" href="/writing">Explore the research</Link>
      </main>
      <SiteFooter />
    </div>
  )
}

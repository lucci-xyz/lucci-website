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
  return (
    <div className="shell" id="top">
      <SiteHeader />
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

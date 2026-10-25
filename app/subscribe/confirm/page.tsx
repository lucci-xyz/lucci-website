import { ConfirmationForm } from "@/components/confirmation-form"
import Link from "next/link"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export default async function ConfirmPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams
  return (
    <div className="shell" id="top">
      <SiteHeader />
      <main className="subscribe-confirm-page">
        <p className="eyebrow">Lucci Labs research</p>
        <h1>Confirm your subscription.</h1>
        <p>One more step before we send you new research. You can unsubscribe from any update.</p>
        {token ? (
          <ConfirmationForm token={token} />
        ) : <p>This confirmation link is incomplete. Please sign up again.</p>}
        <Link className="quiet-link" href="/writing">Explore the research</Link>
      </main>
      <SiteFooter />
    </div>
  )
}

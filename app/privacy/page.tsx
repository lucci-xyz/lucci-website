import { pageMetadata } from "@/lib/seo"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { AnalyticsPreferences } from "@/components/analytics-consent"

export const metadata = pageMetadata("/privacy", "Privacy policy", "How Lucci Labs handles website visits, research subscriptions and optional analytics, and information from Taste.")

export default function PrivacyPage() {
  return (
    <div className="shell" id="top">
      <SiteHeader />
      <main className="index-page">
        <header className="page-hero">
          <p className="eyebrow">Lucci Labs</p>
          <h1>Privacy policy</h1>
          <p className="page-hero-copy">
            Lucci Labs is an independent, open-source project. This policy covers this
            website and Taste, our Pinterest-connected tool.
          </p>
          <p className="privacy-updated">Updated October 24, 2026</p>
        </header>

        <div className="privacy-content">
          <section>
            <h2>This website</h2>
            <p>
              We use Vercel Analytics to understand overall site traffic, such as pages
              visited, device and browser type, and approximate location. It does not use
              tracking cookies. If you email us, we receive your email address and message
              so we can reply.
            </p>
            <p>
              We remember campaign tags from links you visit (UTM parameters), the landing path, and the referring
              site&apos;s domain for up to 90 days in your browser. We include them when you request a research subscription
              so we can understand how people found our work. We do not save full referring URLs.
            </p>
            <p>
              With your permission, Google Analytics 4 measures visits and actions such as research signups. It may use
              cookies and process your IP address and device details. We load it only after you choose
              &ldquo;Allow analytics.&rdquo; You can change your choice below.
            </p>
            <AnalyticsPreferences />
            <p>
              If you subscribe to research updates, we send a confirmation email and add your address to our Resend research list only after you confirm. We use it to send new research and honor unsubscribe requests. Every update includes an unsubscribe link; you can also ask us to remove your address.
            </p>
          </section>

          <section>
            <h2>Taste and Pinterest</h2>
            <p>
              If you connect Taste to Pinterest, we store your Pinterest account ID, basic
              profile details, access tokens, approved board IDs, and board details so the
              connection works. Taste retrieves pins from approved boards when you ask it
              for style context; it does not store copies of those pins.
            </p>
            <p>
              Taste sends the board and pin information requested through its tools to
              ChatGPT to answer you. Pinterest handles account authorization. We use this
              information to provide Taste, not for advertising, and we do not sell it.
            </p>
          </section>

          <section>
            <h2>Your choices</h2>
            <p>
              You can revoke Taste&apos;s access in Pinterest settings. To request deletion
              of information stored by Taste, or ask about this policy, email{" "}
              <a href="mailto:contact@luccilabs.xyz">contact@luccilabs.xyz</a>. We keep
              connection details until you ask us to delete them.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

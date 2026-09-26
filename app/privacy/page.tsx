import type { Metadata } from "next"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Lucci Labs handles information from this website and Aura.",
}

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
            website and Aura, our Pinterest-connected tool.
          </p>
          <p className="privacy-updated">Updated September 26, 2026</p>
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
          </section>

          <section>
            <h2>Aura and Pinterest</h2>
            <p>
              If you connect Aura to Pinterest, we store your Pinterest account ID, basic
              profile details, access tokens, approved board IDs, and board details so the
              connection works. Aura retrieves pins from approved boards when you ask it
              for style context; it does not store copies of those pins.
            </p>
            <p>
              Aura sends the board and pin information requested through its tools to
              ChatGPT to answer you. Pinterest handles account authorization. We use this
              information to provide Aura, not for advertising, and we do not sell it.
            </p>
          </section>

          <section>
            <h2>Your choices</h2>
            <p>
              You can revoke Aura&apos;s access in Pinterest settings. To request deletion
              of information stored by Aura, or ask about this policy, email{" "}
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

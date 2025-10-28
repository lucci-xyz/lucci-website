import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Container from '@/components/Container'
import Section from '@/components/Section'
import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      <div className="relative bg-hero-gradient">
        <Navbar />
        <Container>
          <Section>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-ink">
                Lucci Labs — a playground for Web3 / Crypto / DeFi R&D.
              </h1>
              <p className="mt-6 text-lg text-ink/70">
                If it involves smart contracts, zk‑proofs, or a dangerously experimental tokenomics model,
                you’ll probably find it here… often in a half‑finished branch. We move fast; code can (and will) break.
              </p>
              <div className="mt-8 flex gap-4">
                <Link href="/products" className="rounded-xl bg-ink text-white px-5 py-3 text-sm hover:opacity-90">Explore Products</Link>
                <Link href="/docs" className="rounded-xl border border-black/10 px-5 py-3 text-sm text-ink hover:bg-black/5">Read Docs</Link>
              </div>
            </div>
          </Section>
        </Container>
      </div>

      <div className="hr" />

      <Container>
        <Section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Open‑source tools',
                body: 'Contracts and services for builders: escrow, fee vaults, risk registries.'
              },
              {
                title: 'zk & cryptography',
                body: 'We poke at proofs and privacy like it owes us lunch.'
              },
              {
                title: 'Token design experiments',
                body: 'Mechanisms that might work. Or explode. Measured both ways.'
              }
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border border-black/5 p-6 bg-white/70">
                <h3 className="text-lg font-medium text-ink">{c.title}</h3>
                <p className="mt-2 text-sm text-ink/70">{c.body}</p>
              </div>
            ))}
          </div>
        </Section>
      </Container>

      <Footer />
    </>
  )
}

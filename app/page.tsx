import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Container from '@/components/Container'
import Section from '@/components/Section'
import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <>
      <div className="relative backdrop-blur bg-white/70">
        <Navbar />
        <Container>
          <Section>
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="max-w-3xl">
                <h1 className="text-xl md:text-4xl font-semibold tracking-tight text-ink">
                  Web3 research and development playground.
                  {/* A playground for Web3, Crypto & DeFi R&D. */}
                </h1>
                <p className="mt-6 text-lg text-ink/70">
                  Open-source tool development for DeFi, Crypto, Blockchain, and more.
                </p>
                <div className="mt-8 flex gap-4">
                  <Link href="/products" className="rounded-xl bg-ink text-white px-5 py-3 text-sm hover:opacity-90">Explore Products</Link>
                  <Link href="/docs" className="rounded-xl border border-black/10 px-5 py-3 text-sm text-ink hover:bg-black/5">Read Docs</Link>
                </div>
              </div>
              <div className="flex-shrink-0">
                <Image
                  src="/og.png"
                  alt="Lucci Labs"
                  width={300}
                  height={300}
                  className="rounded-2xl animate-breathe hover:animate-none transition-all duration-300 hover:scale-110"
                />
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

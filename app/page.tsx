import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Container from '@/components/Container'
import Section from '@/components/Section'
import Link from 'next/link'
import AnimatedHero from '@/components/AnimatedHero'

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
                  Money, made intelligently.
                </h1>
                <p className="mt-6 text-lg text-ink/70">
                  Powering a new generation of creators, builders, and businesses.
                </p>
                <div className="mt-8 flex gap-4">
                  <Link href="/products" className="rounded-xl bg-ink text-white px-5 py-3 text-sm hover:opacity-90 flex items-center gap-2">
                    Explore Lucci
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
              <div className="flex-shrink-0">
                <AnimatedHero />
              </div>
            </div>
          </Section>
        </Container>
      </div>

      <div className="hr" />

      <Container>
        <Section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'BountyPay',
                body: 'The economic layer for open source.'
              },
              {
                title: 'Pilot',
                body: 'Where AI pilots your economy and Crypto makes it real.'
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

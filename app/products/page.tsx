import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Container from '@/components/Container'
import Section from '@/components/Section'
import ProductCard from '@/components/ProductCard'
import PhoneNotification from '@/components/PhoneNotification'
import BrowserMockup from '@/components/BrowserMockup'
import products from '@/data/products.json'

export const metadata = { title: 'Products — Lucci' }

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      
      {/* Hero Section with Gradient Background */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-purple-50/50 to-white">
        <div className="absolute inset-0 bg-hero-gradient" />
        <Container>
          <Section>
            <div className="relative z-10 text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-ink">
                Build the Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-pink-400">Open Source</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-ink/70 max-w-2xl mx-auto">
                The economic layer for open source. Pay contributors in stablecoins and automate coordination with AI.
              </p>
              <div className="mt-8 inline-block">
                <blockquote className="text-sm md:text-base italic text-ink/60 border-l-4 border-primary pl-4">
                  "Making open source sustainable through intelligent payments and automation"
                </blockquote>
              </div>
            </div>
          </Section>
        </Container>
      </div>

      {/* Products Grid */}
      <Container>
        <Section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((p) => (
              <ProductCard key={p.name} {...p} />
            ))}
          </div>
        </Section>
      </Container>

      {/* BountyPay Showcase Section */}
      <div className="bg-gradient-to-br from-blue-50 via-purple-50/30 to-white py-16">
        <Container>
          <Section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  BountyPay
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">
                  Get Paid for Your Contributions
                </h2>
                <p className="text-lg text-ink/70 mb-6">
                  Receive instant notifications when you're paid for your open source work. Built on USDC and Base for fast, secure payments.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-ink/70">Instant USDC payments on Base blockchain</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-ink/70">Seamless GitHub integration</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-ink/70">Real-time payment notifications</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <PhoneNotification />
              </div>
            </div>
          </Section>
        </Container>
      </div>

      {/* Installation Section */}
      <Container>
        <Section>
          <div className="space-y-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">
                Get Started in Minutes
              </h2>
              <p className="text-lg text-ink/70">
                Install BountyPay on your GitHub repository and start rewarding contributors today. No complex setup required.
              </p>
            </div>
            <BrowserMockup />
          </div>
        </Section>
      </Container>

      {/* Vision Statement */}
      <div className="bg-gradient-to-r from-primary/5 via-purple-50/50 to-pink-50/50 py-16">
        <Container>
          <Section>
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-400 mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-ink mb-6">
                The Future is <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Intelligent & Decentralized</span>
              </h2>
              <p className="text-xl text-ink/70 mb-8 leading-relaxed">
                We're building infrastructure where AI pilots economic coordination and crypto makes it real. 
                Open source shouldn't just be sustainable—it should be thriving.
              </p>
              <blockquote className="border-l-4 border-primary pl-6 py-2 text-left max-w-2xl mx-auto">
                <p className="text-lg italic text-ink/80 mb-3">
                  "Money, made intelligently. That's not just our tagline—it's our promise to every contributor, maintainer, and builder in the open source ecosystem."
                </p>
                <footer className="text-sm text-ink/60">— Lucci Team</footer>
              </blockquote>
            </div>
          </Section>
        </Container>
      </div>

      <Footer />
    </>
  )
}

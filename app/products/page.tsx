import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Container from '@/components/Container'
import Section from '@/components/Section'
import PhoneNotification from '@/components/PhoneNotification'
import Link from 'next/link'
import products from '@/data/products.json'

export const metadata = { title: 'Products — Lucci' }

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-bounty-50 via-bounty-100/50 to-white">
        <Container>
          <Section>
            <div className="relative z-10 text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-ink">
                Build the Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-bounty via-bounty-light to-bounty-lighter">Open Source</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-ink/70 max-w-2xl mx-auto">
                The economic layer for open source. Pay contributors in stablecoins and automate coordination with AI.
              </p>
              <div className="mt-8 inline-block">
                <blockquote className="text-sm md:text-base italic text-ink/60 border-l-4 border-bounty pl-4">
                  "Making open source sustainable through intelligent payments and automation"
                </blockquote>
              </div>
            </div>
          </Section>
        </Container>
      </div>

      {/* BountyPay Product - Featured with Phone */}
      <Container>
        <Section>
          <Link 
            href="/docs/products/bountypay"
            className="block group"
          >
            <div className="relative rounded-3xl border border-bounty/20 p-8 lg:p-12 hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-white via-bounty-50/30 to-white hover:shadow-xl hover:shadow-bounty/10 overflow-hidden cursor-pointer">
              {/* Gradient accent on hover */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-bounty via-bounty-light to-bounty-lighter transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-ink group-hover:text-bounty transition-colors">
                      BountyPay
                    </h2>
                    <span className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-bounty/10 to-bounty-light/10 text-bounty font-semibold border border-bounty/20 shadow-sm">
                      alpha
                    </span>
                  </div>
                  
                  <p className="text-xl text-ink/70 leading-relaxed mb-8">
                    The economic layer for open source. Get paid instantly in USDC for your contributions.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-bounty/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-bounty" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-ink/70">Instant USDC payments on Base blockchain</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-bounty/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-bounty" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-ink/70">Seamless GitHub integration</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-bounty/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-bounty" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-ink/70">Real-time payment notifications</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    {products[0].tags.map((tag) => (
                      <span 
                        key={tag}
                        className="text-xs px-3 py-1.5 rounded-lg border border-bounty/20 text-bounty bg-bounty-50/30 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-8 flex items-center gap-2 text-bounty font-medium group-hover:gap-4 transition-all">
                    <span>Learn more about BountyPay</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
                
                {/* Phone Mockup */}
                <div className="flex justify-center lg:justify-end">
                  <PhoneNotification />
                </div>
              </div>
              
              {/* Corner decoration */}
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent via-bounty/5 to-bounty-light/10 rounded-tl-full transform translate-x-16 translate-y-16 group-hover:translate-x-8 group-hover:translate-y-8 transition-transform duration-500" />
            </div>
          </Link>
        </Section>
      </Container>

      {/* Other Products */}
      <Container>
        <Section>
          <h2 className="text-2xl md:text-3xl font-bold text-ink mb-8">Other Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.slice(1).map((product) => (
              <Link
                key={product.name}
                href={(product.links?.[0]?.url || '#') as any}
                className="group block"
              >
                <div className="relative rounded-2xl border border-black/5 p-8 hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-white via-white to-primary/5 hover:shadow-xl hover:shadow-primary/10 overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-400 to-pink-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-ink group-hover:text-primary transition-colors">{product.name}</h3>
                    <span className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-purple-400/10 text-primary font-semibold border border-primary/20 shadow-sm">
                      {product.status}
                    </span>
                  </div>
                  
                  <p className="text-base text-ink/70 leading-relaxed mb-6">{product.blurb}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="text-xs px-3 py-1.5 rounded-lg border border-black/10 text-ink/70 bg-white/50 hover:bg-primary/5 hover:border-primary/20 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-4 transition-all">
                    <span>Learn more</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                  
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent via-primary/5 to-purple-400/10 rounded-tl-full transform translate-x-16 translate-y-16 group-hover:translate-x-8 group-hover:translate-y-8 transition-transform duration-500" />
                </div>
              </Link>
            ))}
          </div>
        </Section>
      </Container>

      {/* Vision Statement */}
      <div className="bg-gradient-to-r from-bounty-50/50 via-bounty-100/30 to-white py-16">
        <Container>
          <Section>
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-bounty to-bounty-light mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-ink mb-6">
                The Future is <span className="text-transparent bg-clip-text bg-gradient-to-r from-bounty to-bounty-light">Intelligent & Decentralized</span>
              </h2>
              <p className="text-xl text-ink/70 mb-8 leading-relaxed">
                We're building infrastructure where AI pilots economic coordination and crypto makes it real. 
                Open source shouldn't just be sustainable—it should be thriving.
              </p>
              <blockquote className="border-l-4 border-bounty pl-6 py-2 text-left max-w-2xl mx-auto">
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

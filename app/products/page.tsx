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
      <div className="relative overflow-hidden bg-gradient-to-br from-bounty-50/50 via-white to-white">
        <Container>
          <Section>
            <div className="relative z-10 text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-light tracking-wide text-ink">
                Build the Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-bounty via-bounty-light to-bounty-lighter font-normal">Open Source</span>
              </h1>
              <p className="mt-6 text-base md:text-lg text-ink/60 max-w-2xl mx-auto font-light leading-relaxed">
                The economic layer for open source. Pay contributors in stablecoins and automate coordination with AI.
              </p>
            </div>
          </Section>
        </Container>
      </div>

      {/* BountyPay Product - Featured with Phone */}
      <Container>
        <Section>
          {/* <Link 
            href="/docs/products/bountypay"
            className="block group"
          > */}
            <div className="relative rounded-2xl border border-bounty/10 p-8 lg:p-12 hover:-translate-y-0.5 transition-all duration-500 bg-white hover:border-bounty/20 overflow-hidden cursor-pointer">
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-3xl md:text-4xl font-light text-ink group-hover:text-bounty transition-colors">
                      BountyPay
                    </h2>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-bounty/5 text-bounty/70 font-normal border border-bounty/10">
                      alpha
                    </span>
                  </div>
                  
                  <p className="text-lg text-ink/60 leading-relaxed mb-8 font-light">
                    The economic layer for open source. Get paid instantly in USDC for your contributions.
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-bounty/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-ink/60 text-sm font-light">Instant USDC payments on Base blockchain</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-bounty/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-ink/60 text-sm font-light">Seamless GitHub integration</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-bounty/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-ink/60 text-sm font-light">Real-time payment notifications</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {products[0].tags.map((tag) => (
                      <span 
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-md border border-bounty/10 text-bounty/70 bg-white font-light"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-8 flex items-center gap-2 text-bounty/70 font-light text-sm group-hover:text-bounty group-hover:gap-3 transition-all">
                    <span>Learn more</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
                
                {/* Phone Mockup */}
                <div className="flex justify-center lg:justify-end">
                  <PhoneNotification />
                </div>
              </div>
            </div>
          {/* </Link> */}
        </Section>
      </Container>

      {/* Other Products */}
      <Container>
        <Section>
          <h2 className="text-xl md:text-2xl font-light text-ink mb-8">Other Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.slice(1).map((product) => (
              // <Link
              //   key={product.name}
              //   href={(product.links?.[0]?.url || '#') as any}
              //   className="group block"
              // >
                <div key={product.name} className="relative rounded-2xl border border-black/5 p-8 hover:-translate-y-0.5 transition-all duration-500 bg-white hover:border-primary/10 overflow-hidden">
                  
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-light text-ink group-hover:text-primary transition-colors">{product.name}</h3>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-primary/5 text-primary/70 font-normal border border-primary/10">
                      {product.status}
                    </span>
                  </div>
                  
                  <p className="text-base text-ink/60 leading-relaxed mb-6 font-light">{product.blurb}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-md border border-black/10 text-ink/60 bg-white font-light"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-2 text-primary/70 font-light text-sm group-hover:text-primary group-hover:gap-3 transition-all">
                    <span>Learn more</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              // </Link>
            ))}
          </div>
        </Section>
      </Container>

      {/* Vision Statement */}
      <div className="bg-gradient-to-r from-bounty-50/30 via-white to-white py-12">
        <Container>
          <Section>
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-bounty/5 mb-6 border border-bounty/10">
                <svg className="w-5 h-5 text-bounty/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-ink mb-6">
                The Future is <span className="text-transparent bg-clip-text bg-gradient-to-r from-bounty to-bounty-light font-normal">Intelligent & Decentralized</span>
              </h2>
              <p className="text-base text-ink/60 mb-8 leading-relaxed font-light max-w-2xl mx-auto">
                We're building infrastructure where AI pilots economic coordination and crypto makes it real. 
                Open source shouldn't just be sustainable—it should be thriving.
              </p>
            </div>
          </Section>
        </Container>
      </div>

      <Footer />
    </>
  )
}

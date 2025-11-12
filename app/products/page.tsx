import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Container from '@/components/Container'
import Section from '@/components/Section'
import PhoneNotification from '@/components/PhoneNotification'
import Link from 'next/link'
import products from '@/data/products.json'
import ScrollAnimations from '@/components/ScrollAnimations'

export const metadata = { title: 'Products — Lucci' }

export default function ProductsPage() {

  return (
    <>
      <ScrollAnimations />
      <div className="bg-white">
        <Navbar />
        
        {/* Hero Section */}
        <Container>
          <Section>
            <div className="text-center max-w-4xl mx-auto py-20 lg:py-32">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight animate-fade-in-up" style={{ color: '#00827B' }}>
                Build the future of open source, so you can build your success.
              </h1>
              <p className="mt-6 text-base md:text-lg font-light leading-relaxed animate-fade-in-up delay-200" style={{ color: '#00827B' }}>
                The economic layer for open source. Pay contributors in stablecoins and automate coordination with AI.
              </p>
              <div className="mt-8 animate-fade-in-up delay-400">
                <Link 
                  href="/team"
                  className="inline-block rounded-full px-6 py-3 text-sm font-normal transition-all hover:opacity-90"
                  style={{ backgroundColor: '#00827B', color: 'white' }}
                >
                  Contact us
                </Link>
              </div>
            </div>
          </Section>
        </Container>
        
        {/* Secondary Hero Section */}
        <div style={{ backgroundColor: '#00827B' }}>
          <Container>
            <Section>
              <div className="text-center max-w-5xl lg:max-w-6xl mx-auto py-16 lg:py-16">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight leading-tight lg:leading-snug tracking-normal animate-fade-in-up text-white" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                  We believe shipping should be seamless, visible, and rewarded. Connect your team's Github today to get started!
                </h2>
              </div>
            </Section>
          </Container>
        </div>
        
        {/* Spacer Section */}
        <div className="bg-white py-16 lg:py-24"></div>
      </div>

      {/* BountyPay Product Card */}
      <div className="py-4 lg:py-6 bg-white">
        <Container>
          <div className="w-full max-w-xs sm:max-w-lg md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto lg:mx-0 lg:mr-auto animate-on-scroll animate-slide-in-left-scroll" data-animate="bounty-pay">
            <div className="rounded-xl lg:rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 py-12 sm:py-16 md:py-20 lg:py-24" style={{ backgroundColor: '#D4F6F4' }}>
              <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-center">
                {/* Illustration - Left */}
                <div className="flex-shrink-0 order-2 lg:order-1">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg lg:rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 130, 123, 0.1)' }}>
                    <span className="text-xl sm:text-2xl md:text-3xl">💰</span>
                  </div>
                </div>
                
                {/* Content - Right */}
                <div className="flex-1 text-center lg:text-left order-1 lg:order-2">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-4 sm:mb-6 md:mb-8 lg:mb-10 tracking-wider" style={{ color: '#00827B' }}>
                    BountyPay
                  </h2>
                  <p className="text-sm sm:text-base font-light leading-relaxed mb-6 sm:mb-8 md:mb-10" style={{ color: '#00827B' }}>
                    The economic layer for open source. Get paid instantly in USDC for your contributions with seamless GitHub integration.
                  </p>
                  <div className="flex flex-wrap gap-1 justify-center lg:justify-start">
                    {products[0].tags.map((tag) => (
                      <span 
                        key={tag}
                        className="text-xs px-2 mx-1 py-2 rounded-md bg-white font-normal"
                        style={{ color: '#00827B' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Pilot Product Card - Reversed Layout */}
      <div className="py-4 lg:py-6 bg-white">
        <Container>
          <div className="w-full max-w-xs sm:max-w-lg md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto lg:mx-0 lg:ml-auto animate-on-scroll animate-slide-in-right-scroll" data-animate="pilot">
            <div className="rounded-xl lg:rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 py-12 sm:py-16 md:py-20 lg:py-24" style={{ backgroundColor: '#D4F6F4' }}>
              <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-center">
                {/* Content - Left */}
                <div className="flex-1 text-center lg:text-left order-1">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-4 sm:mb-6 md:mb-8 lg:mb-10 tracking-wider" style={{ color: '#00827B' }}>
                    Pilot
                  </h2>
                  <p className="text-sm sm:text-base font-light leading-relaxed mb-6 sm:mb-8 md:mb-10" style={{ color: '#00827B' }}>
                    Where AI pilots your economy and Crypto makes it real. Automate coordination and let intelligence drive your open source project.
                  </p>
                  <div className="flex flex-wrap gap-1 justify-center lg:justify-start">
                    {products[1].tags.map((tag) => (
                      <span 
                        key={tag}
                        className="text-xs px-2 mx-1 py-2 rounded-md bg-white font-normal"
                        style={{ color: '#00827B' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Illustration - Right */}
                <div className="flex-shrink-0 order-2">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg lg:rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 130, 123, 0.1)' }}>
                    <span className="text-xl sm:text-2xl md:text-3xl">🤖</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Footer bgColor="white" />
    </>
  )
}

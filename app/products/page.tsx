import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Container from '@/components/Container'
import Section from '@/components/Section'
import PhoneNotification from '@/components/PhoneNotification'
import PilotTimeline from '@/components/PilotTimeline'
import Link from 'next/link'
import { PRODUCTS } from '@/lib/data/products'
import ScrollAnimations from '@/components/ScrollAnimations'
import { COLORS } from '@/lib/constants/theme'

export const metadata = { title: 'Products — Lucci' }

export default function ProductsPage() {

  return (
    <>
      <ScrollAnimations />
      <div className="bg-white w-full max-w-[100vw] overflow-x-hidden">
        <Navbar />
        
        {/* Hero Section */}
        <Container>
          <Section>
            <div className="text-center max-w-4xl mx-auto py-12 sm:py-16 md:py-20 lg:py-32">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight animate-fade-in-up" style={{ color: COLORS.primary }}>
                Build the future of open source, so you can build your success.
              </h1>
              <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg font-light leading-relaxed animate-fade-in-up delay-200" style={{ color: COLORS.primary }}>
                The economic layer for open source. Pay contributors in stablecoins and automate coordination with AI.
              </p>
              <div className="mt-6 sm:mt-8 animate-fade-in-up delay-400">
                <Link 
                  href="/team"
                  className="inline-block rounded-full px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-normal transition-all hover:opacity-90"
                  style={{ backgroundColor: COLORS.primary, color: COLORS.white }}
                >
                  Contact us
                </Link>
              </div>
            </div>
          </Section>
        </Container>
        
        {/* Secondary Hero Section */}
        <div className="w-full max-w-[100vw]" style={{ backgroundColor: COLORS.backgroundMint }}>
          <Container>
            <Section>
              <div className="text-center max-w-5xl lg:max-w-6xl mx-auto py-12 sm:py-14 md:py-16 lg:py-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extralight leading-tight lg:leading-snug tracking-normal animate-fade-in-up" style={{ fontFamily: 'Georgia, "Times New Roman", serif', color: COLORS.primary }}>
                  We believe shipping should be seamless, visible, and rewarded. Connect your team's Github today to get started!
                </h2>
              </div>
            </Section>
          </Container>
        </div>
        
        {/* Spacer Section */}
        <div className="bg-white py-12 sm:py-16 md:py-20 lg:py-24"></div>
      </div>

      {/* BountyPay Product Card */}
      <div className="py-4 sm:py-6 lg:py-8 bg-white px-4 sm:px-6 w-full max-w-[100vw]">
        <Container>
          <div className="w-full max-w-full sm:max-w-lg md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto lg:mx-0 lg:mr-auto animate-on-scroll animate-slide-in-left-scroll" data-animate="bounty-pay">
            <div className="rounded-xl lg:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 py-6 sm:py-10 md:py-14 lg:py-18 xl:py-20 w-full" style={{ backgroundColor: COLORS.backgroundLight }}>
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center w-full">
                {/* Notification - Left */}
                <div className="flex-shrink-0 order-2 lg:order-1 w-full max-w-md flex justify-center lg:justify-start">
                  <PhoneNotification />
                </div>
                
                {/* Content - Right */}
                <div className="flex-1 text-center lg:text-left order-1 lg:order-2 w-full">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-4 sm:mb-6 lg:mb-8 tracking-wider flex items-center gap-3 justify-center lg:justify-start flex-wrap" style={{ color: COLORS.primary }}>
                    BountyPay
                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-white/50 backdrop-blur-sm font-normal" style={{ color: COLORS.primary }}>
                      Alpha
                    </span>
                  </h2>
                  <p className="text-sm sm:text-base font-light leading-relaxed mb-6 sm:mb-8" style={{ color: COLORS.primary }}>
                    The economic layer for open source. Get paid instantly in cryptocurrency for your contributions with seamless GitHub integration.
                  </p>
                  <div className="flex justify-center lg:justify-start">
                    <Link 
                      href="https://bounty.luccilabs.xyz"
                      className="inline-flex items-center gap-2 rounded-full px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-normal transition-all hover:opacity-90"
                      style={{ backgroundColor: COLORS.primary, color: COLORS.white }}
                    >
                      Get Started
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Pilot Product Card - Reversed Layout */}
      <div className="py-4 sm:py-6 lg:py-8 bg-white px-4 sm:px-6 w-full max-w-[100vw]">
        <Container>
          <div className="w-full max-w-full sm:max-w-lg md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto lg:mx-0 lg:ml-auto animate-on-scroll animate-slide-in-right-scroll" data-animate="pilot">
            <div className="rounded-xl lg:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 py-6 sm:py-10 md:py-14 lg:py-18 xl:py-20 w-full" style={{ backgroundColor: COLORS.backgroundLight }}>
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center w-full">
                {/* Content - Left */}
                <div className="flex-1 text-center lg:text-left order-1 w-full">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-4 sm:mb-6 lg:mb-8 tracking-wider flex items-center gap-3 justify-center lg:justify-start flex-wrap" style={{ color: COLORS.primary }}>
                    Pilot
                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-white/50 backdrop-blur-sm font-normal" style={{ color: COLORS.primary }}>
                      Coming Soon
                    </span>
                  </h2>
                  <p className="text-sm sm:text-base font-light leading-relaxed mb-6 sm:mb-8" style={{ color: COLORS.primary }}>
                    Where AI pilots your economy and Crypto makes it real. Automate coordination and let intelligence drive your open source project.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                    {PRODUCTS[1].tags.map((tag) => (
                      <span 
                        key={tag}
                        className="text-xs px-2.5 py-2 rounded-md bg-white font-normal"
                        style={{ color: COLORS.primary }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Timeline - Right */}
                <div className="flex-shrink-0 order-2 w-full max-w-sm flex justify-center lg:justify-end">
                  <PilotTimeline />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Footer bgColor={COLORS.white} />
    </>
  )
}

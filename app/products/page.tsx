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
      <div className="bg-white">
        <Navbar />
        
        {/* Hero Section */}
        <Container>
          <Section>
            <div className="text-center max-w-4xl mx-auto py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight animate-fade-in-up" style={{ color: COLORS.primary }}>
                Build the future of open source, so you can build your success.
              </h1>
              <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg font-light leading-relaxed animate-fade-in-up delay-200 px-2" style={{ color: COLORS.primary }}>
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
        <div style={{ backgroundColor: COLORS.primary }}>
          <Container>
            <Section>
              <div className="text-center max-w-5xl lg:max-w-6xl mx-auto py-12 sm:py-14 md:py-16 lg:py-16 px-4 sm:px-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extralight leading-tight lg:leading-snug tracking-normal animate-fade-in-up text-white" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
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
      <div className="py-4 sm:py-6 lg:py-8 bg-white px-4 sm:px-6">
        <Container>
          <div className="w-full max-w-full sm:max-w-lg md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto lg:mx-0 lg:mr-auto animate-on-scroll animate-slide-in-left-scroll" data-animate="bounty-pay">
            <div className="rounded-xl lg:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24" style={{ backgroundColor: COLORS.backgroundLight }}>
              <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 items-center">
                {/* Notification - Left */}
                <div className="flex-shrink-0 order-2 lg:order-1 w-full max-w-full sm:max-w-md flex justify-center lg:justify-start">
                  <PhoneNotification />
                </div>
                
                {/* Content - Right */}
                <div className="flex-1 text-center lg:text-left order-1 lg:order-2 w-full">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light mb-3 sm:mb-4 md:mb-6 lg:mb-8 xl:mb-10 tracking-wider flex items-center gap-2 sm:gap-3 justify-center lg:justify-start flex-wrap" style={{ color: COLORS.primary }}>
                    BountyPay
                    <span className="text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full bg-white/50 backdrop-blur-sm font-normal mt-1 sm:mt-2.5" style={{ color: COLORS.primary }}>
                      Alpha
                    </span>
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base font-light leading-relaxed mb-4 sm:mb-6 md:mb-8 lg:mb-10 px-2 sm:px-0" style={{ color: COLORS.primary }}>
                    The economic layer for open source. Get paid instantly in cryptocurrency for your contributions with seamless GitHub integration.
                  </p>
                  <div className="flex justify-center lg:justify-start">
                    <Link 
                      href="/team"
                      className="inline-flex items-center gap-2 rounded-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base font-normal transition-all hover:opacity-90"
                      style={{ backgroundColor: COLORS.primary, color: COLORS.white }}
                    >
                      Get Started
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
      <div className="py-4 sm:py-6 lg:py-8 bg-white px-4 sm:px-6">
        <Container>
          <div className="w-full max-w-full sm:max-w-lg md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto lg:mx-0 lg:ml-auto animate-on-scroll animate-slide-in-right-scroll" data-animate="pilot">
            <div className="rounded-xl lg:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24" style={{ backgroundColor: COLORS.backgroundLight }}>
              <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 items-center">
                {/* Content - Left */}
                <div className="flex-1 text-center lg:text-left order-1 w-full">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light mb-3 sm:mb-4 md:mb-6 lg:mb-8 xl:mb-10 tracking-wider flex items-center gap-2 sm:gap-3 justify-center lg:justify-start flex-wrap" style={{ color: COLORS.primary }}>
                    Pilot
                    <span className="text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full bg-white/50 backdrop-blur-sm font-normal mt-1 sm:mt-2.5" style={{ color: COLORS.primary }}>
                      Coming Soon
                    </span>
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base font-light leading-relaxed mb-4 sm:mb-6 md:mb-8 lg:mb-10 px-2 sm:px-0" style={{ color: COLORS.primary }}>
                    Where AI pilots your economy and Crypto makes it real. Automate coordination and let intelligence drive your open source project.
                  </p>
                  <div className="flex flex-wrap gap-1 sm:gap-2 justify-center lg:justify-start">
                    {PRODUCTS[1].tags.map((tag) => (
                      <span 
                        key={tag}
                        className="text-[10px] sm:text-xs px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-md bg-white font-normal"
                        style={{ color: COLORS.primary }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Timeline - Right */}
                <div className="flex-shrink-0 order-2 w-full max-w-full sm:max-w-md flex justify-center lg:justify-end">
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

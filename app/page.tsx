import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Container from '@/components/Container'
import Link from 'next/link'
import Image from 'next/image'
import { COLORS } from '@/lib/constants/theme'

export default function HomePage() {
  return (
    <>
      <div className="relative min-h-screen flex flex-col" style={{ backgroundColor: COLORS.backgroundMint }}>
        <Navbar />
        <Container>
          <div className="flex-1 flex items-center pt-20 pb-12 lg:pt-24 lg:pb-20">
            <div className="w-full">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
                <div className="flex-1 lg:pr-8">
                  <h1 className="text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight animate-fade-in-up" style={{ color: COLORS.primary }}>
                    Powering the Next Generation of Builders
                  </h1>
                  <p className="mt-10 text-base md:text-lg font-light leading-relaxed animate-fade-in-up delay-200" style={{ color: COLORS.primary }}>
                    Autonomous payouts and operations for open source developers
                  </p>
                  <div className="mt-12 animate-fade-in-up delay-400">
                    <Link 
                      href="/products" 
                      className="inline-block rounded-full px-6 py-3 text-sm font-normal transition-all hover:opacity-90"
                      style={{ backgroundColor: COLORS.primary, color: COLORS.backgroundMint }}
                    >
                      Explore Products
                    </Link>
                  </div>
                </div>
                <div className="flex-shrink-0 animate-slide-up delay-300">
                  <Image
                    src="/og.png"
                    alt="Lucci"
                    width={500}
                    height={500}
                    className="w-[320px] md:w-[400px] lg:w-[460px] xl:w-[520px] animate-float-glow"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Footer />
    </>
  )
}

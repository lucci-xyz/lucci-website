"use client"

import { useReveal } from "@/hooks/use-reveal"
import { MagneticButton } from "@/components/magnetic-button"

/**
 * About section with company stats and description
 * Features animated stat counters and staggered reveal animations
 */
export function AboutSection({ scrollToSection }: { scrollToSection: (index: number) => void }) {
  const { ref, isVisible } = useReveal(0.3)

  const stats = [
    {
      value: "50+",
      label: "Contributors",
      sublabel: "Paid worldwide",
    },
    {
      value: "3",
      label: "Networks",
      sublabel: "Live in Beta",
    },
    {
      value: "∞",
      label: "Potential",
      sublabel: "For digital innovation",
    },
  ]

  return (
    <section
      ref={ref}
      className="relative flex h-screen w-screen shrink-0 snap-start flex-col justify-center px-4 pt-16 sm:px-8 sm:pt-0 md:px-20 lg:flex-row lg:items-center lg:px-32 xl:px-40"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        {/* Left Column - Heading & Description */}
        <div className="flex max-w-2xl flex-col justify-center">
          {/* Main Heading */}
          <h2
            className={`mb-6 font-sans text-3xl font-light leading-[1.15] tracking-tight text-white transition-all duration-700 sm:text-4xl md:mb-8 md:text-5xl lg:text-6xl ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            Building the
            <br />
            future of
            <br />
            <span className="bg-gradient-to-r from-white/50 via-white/30 to-white/10 bg-clip-text text-transparent">
              digital
            </span>
          </h2>

          {/* Description Paragraphs */}
          <div
            className={`mb-6 space-y-4 transition-all delay-200 duration-700 md:mb-10 md:space-y-5 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <p className="max-w-lg text-sm leading-relaxed text-white/70 sm:text-base md:text-lg">
              We&apos;re a team of builders obsessed with creating the 
              economic infrastructure for open source development. 
              Every line of code should be rewarded.
            </p>
            <p className="max-w-lg text-sm leading-relaxed text-white/70 sm:text-base md:text-lg">
              Every project is an opportunity to push the boundaries of 
              how developers collaborate and get compensated for their work.
            </p>
          </div>

          {/* CTA Buttons - Hidden on mobile, shown on desktop */}
          <div
            className={`hidden flex-col gap-4 transition-all delay-300 duration-700 sm:flex sm:flex-row sm:items-center ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <MagneticButton
              variant="secondary"
              size="lg"
              className="border-none bg-white/20 text-white hover:bg-white/30"
              onClick={() => scrollToSection(1)}
            >
              View Our Work
            </MagneticButton>
          </div>
        </div>

        {/* Right Column - Stats (Desktop) */}
        <div className="relative hidden h-[60vh] w-[45%] lg:block">
          {/* Stat 1 - Top area */}
          <div
            className={`absolute left-0 top-[5%] transition-all delay-100 duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
            }`}
          >
            <div className="flex items-center gap-6">
              <div className="h-24 w-px bg-white/30" />
              <div className="flex items-baseline gap-6">
                <span className="font-sans text-5xl font-light tracking-tight text-white xl:text-7xl">
                  {stats[0].value}
                </span>
                <div>
                  <p className="font-sans text-lg font-normal text-white">{stats[0].label}</p>
                  <p className="font-mono text-sm text-white/50">
                    {stats[0].sublabel}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stat 2 - Middle right with line */}
          <div
            className={`absolute right-0 top-[45%] transition-all delay-200 duration-700 ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
            }`}
          >
            <div className="flex items-center gap-6">
              <div className="h-24 w-px bg-white/30" />
              <div className="flex items-baseline gap-6">
                <span className="font-sans text-5xl font-light tracking-tight text-white xl:text-7xl">
                  {stats[1].value}
                </span>
                <div>
                  <p className="font-sans text-lg font-normal text-white">{stats[1].label}</p>
                  <p className="font-mono text-sm text-white/50">
                    {stats[1].sublabel}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stat 3 - Bottom left with line */}
          <div
            className={`absolute bottom-[10%] left-0 transition-all delay-300 duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <div className="flex items-center gap-6">
              <div className="h-24 w-px bg-white/30" />
              <div className="flex items-baseline gap-6">
                <span className="font-sans text-5xl font-light tracking-tight text-white xl:text-7xl">
                  {stats[2].value}
                </span>
                <div>
                  <p className="font-sans text-lg font-normal text-white">{stats[2].label}</p>
                  <p className="font-mono text-sm text-white/50">
                    {stats[2].sublabel}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Stats - Now part of normal flow */}
        <div className="grid grid-cols-2 gap-4 lg:hidden">
          {stats.slice(0, 2).map((stat, i) => (
            <div
              key={stat.label}
              className={`transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${(i + 2) * 100}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-px bg-white/30" />
                <div className="flex items-baseline gap-2">
                  <span className="font-sans text-3xl font-extralight text-white sm:text-4xl">
                    {stat.value}
                  </span>
                  <div>
                    <p className="font-sans text-xs font-normal text-white sm:text-sm">{stat.label}</p>
                    <p className="font-mono text-[10px] text-white/50 sm:text-xs">
                      {stat.sublabel}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

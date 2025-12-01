"use client"

import { useReveal } from "@/hooks/use-reveal"

interface ProductsSectionProps {
  scrollToSection?: (index: number) => void
}

export function ProductsSection({ scrollToSection }: ProductsSectionProps) {
  const { ref, isVisible } = useReveal(0.3)

  const productDetails = [
    {
      id: "01",
      name: "BountyPay",
      category: "Payment Infrastructure",
      link: "https://bountypay.luccilabs.xyz",
      linkText: "Try it →",
      marginLeft: "0%",
      width: "85%",
    },
    {
      id: "02",
      name: "Pilot",
      category: "AI Coordination",
      link: null,
      linkText: "Coming Soon",
      marginLeft: "15%",
      width: "85%",
    },
    {
      id: "03",
      name: "Orbit",
      category: "Crypto Autopilot",
      link: null,
      linkText: "Coming Soon",
      marginLeft: "0%",
      width: "85%",
    },
  ]

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start flex-col justify-center px-4 py-20 sm:px-8 sm:py-0 md:px-20 lg:px-32 xl:px-40"
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* Section Header */}
        <div
          className={`mb-8 transition-all duration-700 md:mb-20 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-3xl font-light leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Featured
          </h2>
          <p className="font-mono text-xs text-white/50 md:text-sm">/ Recent explorations</p>
        </div>

        {/* Product List - Staggered layout */}
        <div className="space-y-6 md:space-y-12">
          {productDetails.map((product, index) => (
            <div
              key={product.id}
              className={`transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ 
                transitionDelay: `${300 + index * 150}ms`,
                marginLeft: product.marginLeft,
                width: product.width,
              }}
            >
              <div 
                className="group cursor-pointer"
                onClick={() => product.link && window.open(product.link, "_blank")}
              >
                <div className="flex items-start justify-between pb-3 sm:pb-4 md:pb-6">
                  <div className="flex items-start gap-3 sm:gap-6 md:gap-10">
                    <span className="font-mono text-[10px] text-white/40 pt-1 sm:text-xs sm:pt-2">
                      {product.id}
                    </span>
                    <div>
                      <h3 className="font-sans text-lg font-light text-white transition-colors group-hover:text-white/80 sm:text-2xl sm:mb-1 md:text-3xl lg:text-4xl">
                        {product.name}
                      </h3>
                      <p className="font-mono text-[9px] tracking-wide text-white/50 sm:text-[10px] md:text-xs">
                        {product.category}
                      </p>
                    </div>
                  </div>
                  {product.link ? (
                    <a 
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[10px] text-white/60 pt-1 transition-colors hover:text-accent sm:text-xs sm:pt-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {product.linkText}
                    </a>
                  ) : (
                    <span className="font-mono text-[10px] text-white/40 pt-1 sm:text-xs sm:pt-2">
                      {product.linkText}
                    </span>
                  )}
                </div>
                {/* Underline */}
                <div className="h-px w-full bg-white/15 transition-all duration-300 group-hover:bg-white/25" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

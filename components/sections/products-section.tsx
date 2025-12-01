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
      indent: 0,
    },
    {
      id: "02",
      name: "Pilot",
      category: "AI Coordination",
      link: null,
      linkText: "Coming Soon",
      indent: 8,
    },
    {
      id: "03",
      name: "Orbit",
      category: "Crypto Autopilot",
      link: null,
      linkText: "Coming Soon",
      indent: 0,
    },
  ]

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-16 md:px-12 md:pt-0 lg:px-20"
    >
      <div className="mx-auto w-full max-w-5xl">
        <div
          className={`mb-12 transition-all duration-700 md:mb-16 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-4xl font-light leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl xl:text-7xl">
            Products
          </h2>
          <p className="font-mono text-xs text-white/50 md:text-sm">/ Building the future of open source</p>
        </div>

        {/* Product List - Featured style with stair step */}
        <div className="space-y-0">
          {productDetails.map((product, index) => (
            <div
              key={product.id}
              className={`group border-b-[0.5px] transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ 
                transitionDelay: `${300 + index * 150}ms`,
                marginLeft: `${product.indent}%`,
                borderColor: 'rgba(255, 255, 255, 0.15)',
              }}
            >
              <div 
                className="flex cursor-pointer items-start justify-between py-6 transition-all duration-300 hover:py-10 md:py-8 md:hover:py-12"
                onClick={() => product.link && window.open(product.link, "_blank")}
              >
                <div className="flex items-center gap-8 md:gap-12">
                  <span className="font-mono text-xs md:text-sm text-white/40 -mt-3">
                    {product.id}
                  </span>
                  <div>
                    <h3 className="font-sans text-2xl font-light text-white transition-colors group-hover:text-white/90 md:text-3xl lg:text-4xl mb-1">
                      {product.name}
                    </h3>
                    <p className="font-mono text-[10px] tracking-wide text-white/50 md:text-xs">
                      {product.category}
                    </p>
                  </div>
                </div>
                {product.link ? (
                  <a 
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-white/60 pt-1 md:pt-2 transition-colors hover:text-accent"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {product.linkText}
                  </a>
                ) : (
                  <span className="font-mono text-xs text-white/40 pt-1 md:pt-2">
                    {product.linkText}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import { useReveal } from "@/hooks/use-reveal"

export function CapabilitiesSection() {
  const { ref, isVisible } = useReveal(0.3)

  const capabilities = [
    {
      title: "GitHub Integration",
      description: "Seamlessly connect your repositories and automate contributor payouts based on merged PRs",
      direction: "top",
    },
    {
      title: "Stablecoin Payments",
      description: "Pay contributors instantly in USDC on Base network with minimal fees",
      direction: "right",
    },
    {
      title: "AI Coordination",
      description: "Let Pilot handle project coordination, bounty assignments, and contributor management",
      direction: "left",
    },
    {
      title: "Transparent Economics",
      description: "Full visibility into payouts, contributions, and project treasury with on-chain verification",
      direction: "bottom",
    },
  ]

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-4 pt-16 md:px-8 md:pt-0"
    >
      <div className="mx-auto w-full max-w-5xl">
        <div
          className={`mb-8 transition-all duration-700 md:mb-10 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-4xl font-light leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl xl:text-7xl">
            Capabilities
          </h2>
          <p className="font-mono text-[10px] text-white/50 md:text-xs">/ What we bring to open source</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-x-12 md:gap-y-8">
          {capabilities.map((capability, i) => (
            <CapabilityCard key={i} capability={capability} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CapabilityCard({
  capability,
  index,
  isVisible,
}: {
  capability: { title: string; description: string; direction: string }
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      switch (capability.direction) {
        case "left":
          return "-translate-x-12 opacity-0"
        case "right":
          return "translate-x-12 opacity-0"
        case "top":
          return "-translate-y-12 opacity-0"
        case "bottom":
          return "translate-y-12 opacity-0"
        default:
          return "translate-y-8 opacity-0"
      }
    }
    return "translate-x-0 translate-y-0 opacity-100"
  }

  return (
    <div
      className={`group transition-all duration-700 ${getRevealClass()}`}
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
    >
      <div className="mb-2 flex items-center gap-2">
        <div className="h-px w-6 bg-accent/50 transition-all duration-300 group-hover:w-8 group-hover:bg-accent" />
        <span className="font-mono text-[9px] text-white/50">0{index + 1}</span>
      </div>
      <h3 className="mb-1 font-sans text-base font-light text-white md:text-lg lg:text-xl">{capability.title}</h3>
      <p className="max-w-xs text-xs leading-relaxed text-white/60 md:text-sm">{capability.description}</p>
    </div>
  )
}

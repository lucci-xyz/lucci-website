"use client"

import { useReveal } from "@/hooks/use-reveal"

export function CapabilitiesSection() {
  const { ref, isVisible } = useReveal(0.3)

  const focus = [
    {
      title: "Open Source",
      description: "Ecosystems of shared code, shared incentives, and the tools that help contributors and maintainers thrive",
      direction: "top",
    },
    {
      title: "Onchain Economies",
      description: "Experiments in web3-native value flow: capital, rewards, and ownership designed for the open internet",
      direction: "right",
    },
    {
      title: "Intelligent Systems",
      description: "AI-native interfaces, agents, and automations that collaborate with people and projects instead of replacing them",
      direction: "left",
    },
    {
      title: "Digital Experiments",
      description: "Small, opinionated products at the intersection of open source, web3, and AI that can grow into full ecosystems",
      direction: "bottom",
    },
  ]

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start flex-col justify-center overflow-y-auto px-4 py-20 sm:px-8 sm:py-0 md:px-20 lg:px-32 xl:px-40"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-6 transition-all duration-700 md:mb-16 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-3xl font-light leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Focus
          </h2>
          <p className="font-mono text-xs text-white/50 md:text-sm">/ Where we spend our time</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 md:gap-x-20 md:gap-y-14 lg:gap-x-32 lg:gap-y-16">
          {focus.map((capability, i) => (
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
      <div className="mb-2 flex items-center gap-2 sm:mb-3 sm:gap-3">
        <div className="h-px w-6 bg-accent/50 transition-all duration-300 group-hover:w-10 group-hover:bg-accent sm:w-8 sm:group-hover:w-12" />
        <span className="font-mono text-[10px] text-white/50 sm:text-xs">0{index + 1}</span>
      </div>
      <h3 className="mb-1 font-sans text-lg font-light text-white sm:mb-2 sm:text-xl md:text-2xl lg:text-3xl">{capability.title}</h3>
      <p className="max-w-md text-xs leading-relaxed text-white/60 sm:text-sm md:text-base">{capability.description}</p>
    </div>
  )
}

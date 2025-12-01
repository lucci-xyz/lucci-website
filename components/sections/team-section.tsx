"use client"

import { MagneticButton } from "@/components/magnetic-button"
import { useReveal } from "@/hooks/use-reveal"
import { TEAM_MEMBERS } from "@/lib/data/team"
import Image from "next/image"

export function TeamSection({ scrollToSection }: { scrollToSection?: (index: number) => void }) {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-4 pt-16 md:px-8 md:pt-0"
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="grid gap-6 md:grid-cols-2 md:gap-12">
          {/* Left side - Intro */}
          <div>
            <div
              className={`mb-4 transition-all duration-700 md:mb-8 ${
                isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
              }`}
            >
              <h2 className="mb-2 font-sans text-2xl font-light leading-[1.1] tracking-tight text-white md:text-3xl lg:text-4xl">
                Meet the
                <br />
                <span className="text-accent">Team</span>
              </h2>
            </div>

            <div
              className={`space-y-2 transition-all duration-700 md:space-y-3 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <p className="max-w-sm text-xs leading-relaxed text-white/70 md:text-sm">
                We're building the economic layer for open source. Our mission is to make shipping seamless, 
                visible, and rewarded.
              </p>
              <p className="max-w-sm text-xs leading-relaxed text-white/70 md:text-sm">
                Every line of code should be valued. Every contributor should be paid.
              </p>
            </div>
          </div>

          {/* Right side - Team Members */}
          <div className="flex flex-col justify-center space-y-4 md:space-y-6">
            {TEAM_MEMBERS.map((member, i) => {
              const getRevealClass = () => {
                if (!isVisible) {
                  return i % 2 === 0 ? "-translate-x-12 opacity-0" : "translate-x-12 opacity-0"
                }
                return "translate-x-0 opacity-100"
              }

              return (
                <div
                  key={member.name}
                  className={`group flex items-center gap-3 border-l border-white/20 pl-3 transition-all duration-700 md:gap-4 md:pl-4 ${getRevealClass()}`}
                  style={{
                    transitionDelay: `${300 + i * 150}ms`,
                    marginLeft: i % 2 === 0 ? "0" : "auto",
                    maxWidth: i % 2 === 0 ? "100%" : "95%",
                  }}
                >
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full md:h-14 md:w-14">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div>
                    <div className="font-sans text-base font-light text-white md:text-lg">{member.name}</div>
                    <a
                      href={`mailto:${member.email}`}
                      className="font-mono text-[10px] text-white/50 transition-colors hover:text-accent"
                    >
                      {member.email}
                    </a>
                    <div className="mt-0.5">
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[9px] text-white/40 transition-colors hover:text-white/60"
                      >
                        GitHub →
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div
          className={`mt-6 flex flex-wrap gap-2 transition-all duration-700 md:mt-10 md:gap-3 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
          style={{ transitionDelay: "750ms" }}
        >
          <MagneticButton variant="primary" onClick={() => scrollToSection?.(4)}>
            Get in Touch
          </MagneticButton>
          <MagneticButton variant="secondary" onClick={() => scrollToSection?.(1)}>
            Explore Products
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}

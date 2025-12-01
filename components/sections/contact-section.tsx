"use client"

import { Mail, Github } from "lucide-react"
import { useReveal } from "@/hooks/use-reveal"
import { useState, type FormEvent } from "react"
import { MagneticButton } from "@/components/magnetic-button"
import { SOCIAL_LINKS } from "@/lib/constants/social"

export function ContactSection() {
  const { ref, isVisible } = useReveal(0.3)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      return
    }

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setSubmitSuccess(true)
    setFormData({ name: "", email: "", message: "" })

    setTimeout(() => setSubmitSuccess(false), 5000)
  }

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-4 pt-16 md:px-8 md:pt-0"
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] md:gap-12">
          <div className="flex flex-col justify-center">
            <div
              className={`mb-4 transition-all duration-700 md:mb-8 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
              }`}
            >
              <h2 className="mb-2 font-sans text-4xl font-light leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl xl:text-7xl">
                Let's
                <br />
                <span className="text-white">Connect</span>
              </h2>
              <p className="font-mono text-[10px] text-white/50 md:text-xs">/ Start building with us</p>
            </div>

            <div className="space-y-3 md:space-y-5">
              <a
                href="mailto:contact@luccilabs.xyz"
                className={`group block transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <div className="mb-0.5 flex items-center gap-1.5">
                  <Mail className="h-2.5 w-2.5 text-white/50" />
                  <span className="font-mono text-[9px] text-white/50">Email</span>
                </div>
                <p className="text-sm text-white transition-colors group-hover:text-accent md:text-base">
                  contact@luccilabs.xyz
                </p>
              </a>

              <a
                href="https://github.com/lucci-xyz"
                target="_blank"
                rel="noopener noreferrer"
                className={`group block transition-all duration-700 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: "350ms" }}
              >
                <div className="mb-0.5 flex items-center gap-1.5">
                  <Github className="h-2.5 w-2.5 text-white/50" />
                  <span className="font-mono text-[9px] text-white/50">GitHub</span>
                </div>
                <p className="text-sm text-white transition-colors group-hover:text-accent md:text-base">
                  github.com/lucci-xyz
                </p>
              </a>

              <div
                className={`flex gap-2 pt-1 transition-all duration-700 md:pt-2 ${
                  isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                }`}
                style={{ transitionDelay: "500ms" }}
              >
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-transparent font-mono text-[10px] text-white/50 transition-all hover:border-accent hover:text-accent"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
              <div
                className={`transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <label className="mb-1 block font-mono text-[9px] text-white/50">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full border-b border-white/20 bg-transparent py-1 text-xs text-white placeholder:text-white/30 focus:border-accent focus:outline-none md:py-1.5 md:text-sm"
                  placeholder="Your name"
                />
              </div>

              <div
                className={`transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
                }`}
                style={{ transitionDelay: "350ms" }}
              >
                <label className="mb-1 block font-mono text-[9px] text-white/50">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full border-b border-white/20 bg-transparent py-1 text-xs text-white placeholder:text-white/30 focus:border-accent focus:outline-none md:py-1.5 md:text-sm"
                  placeholder="your@email.com"
                />
              </div>

              <div
                className={`transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
                }`}
                style={{ transitionDelay: "500ms" }}
              >
                <label className="mb-1 block font-mono text-[9px] text-white/50">Message</label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="w-full border-b border-white/20 bg-transparent py-1 text-xs text-white placeholder:text-white/30 focus:border-accent focus:outline-none md:py-1.5 md:text-sm"
                  placeholder="Tell us about your project..."
                />
              </div>

              <div
                className={`transition-all duration-700 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: "650ms" }}
              >
                <MagneticButton
                  variant="primary"
                  className="w-full disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </MagneticButton>
                {submitSuccess && (
                  <p className="mt-2 text-center font-mono text-[10px] text-accent">Message sent successfully!</p>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Footer note */}
        <div
          className={`mt-8 text-center transition-all duration-700 md:mt-12 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <p className="font-mono text-[9px] text-white/30">
            © {new Date().getFullYear()} Lucci. The economic layer for open source.
          </p>
        </div>
      </div>
    </section>
  )
}

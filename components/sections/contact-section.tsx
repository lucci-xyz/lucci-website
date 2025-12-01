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
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Using FormSubmit.co - free, no signup required
      const response = await fetch("https://formsubmit.co/ajax/2b5a579f2eaabe6e62caecc9d31c201c", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Contact from ${formData.name}`,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      setSubmitStatus("success")
      setFormData({ name: "", email: "", message: "" })
      setTimeout(() => setSubmitStatus("idle"), 5000)
    } catch {
      setSubmitStatus("error")
      setTimeout(() => setSubmitStatus("idle"), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start flex-col justify-center overflow-y-auto px-4 py-20 sm:px-8 sm:py-0 md:px-20 lg:px-32 xl:px-40"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:gap-16 lg:gap-24">
          {/* Left side - Contact info (hidden on mobile, shown on desktop) */}
          <div className="hidden flex-col justify-center md:flex">
            <div
              className={`mb-4 transition-all duration-700 md:mb-10 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
              }`}
            >
              <h2 className="mb-2 font-sans text-3xl font-light leading-[1.1] tracking-tight text-white sm:text-4xl md:mb-3 md:text-5xl lg:text-6xl">
                Let's
                <br />
                <span className="text-white">Talk</span>
              </h2>
              <p className="font-mono text-xs text-white/50 md:text-sm">/ Start building with us</p>
            </div>

            <div className="space-y-3 md:space-y-6">
              <a
                href="mailto:contact@luccilabs.xyz"
                className={`group block transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <div className="mb-1 flex items-center gap-2">
                  <Mail className="h-3 w-3 text-white/50" />
                  <span className="font-mono text-xs text-white/50">Email</span>
                </div>
                <p className="text-base text-white transition-colors group-hover:text-accent sm:text-lg md:text-xl">
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
                <div className="mb-1 flex items-center gap-2">
                  <Github className="h-3 w-3 text-white/50" />
                  <span className="font-mono text-xs text-white/50">GitHub</span>
                </div>
                <p className="text-base text-white transition-colors group-hover:text-accent sm:text-lg md:text-xl">
                  github.com/lucci-xyz
                </p>
              </a>

              <div
                className={`flex gap-4 pt-2 transition-all duration-700 md:pt-4 ${
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
                    className="font-mono text-xs text-white/50 transition-all hover:text-accent md:text-sm"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile/Form side - Heading and Form */}
          <div className="flex flex-col justify-center md:col-start-2">
            {/* Mobile-only heading */}
            <div
              className={`mb-6 transition-all duration-700 md:hidden ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
              }`}
            >
              <h2 className="mb-2 font-sans text-3xl font-light leading-[1.1] tracking-tight text-white">
                Let's
                <br />
                <span className="text-white">Talk</span>
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 md:space-y-6">
              <div
                className={`transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <label className="mb-2 block font-mono text-xs text-white/50 md:text-xs">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full border-b-[0.5px] bg-transparent py-2.5 text-base text-white placeholder:text-white/30 focus:border-accent focus:outline-none md:text-base"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.15)' }}
                  placeholder="Your name"
                />
              </div>

              <div
                className={`transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
                }`}
                style={{ transitionDelay: "350ms" }}
              >
                <label className="mb-2 block font-mono text-xs text-white/50 md:text-xs">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full border-b-[0.5px] bg-transparent py-2.5 text-base text-white placeholder:text-white/30 focus:border-accent focus:outline-none md:text-base"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.15)' }}
                  placeholder="your@email.com"
                />
              </div>

              <div
                className={`transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
                }`}
                style={{ transitionDelay: "500ms" }}
              >
                <label className="mb-2 block font-mono text-xs text-white/50 md:text-xs">Message</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="w-full border-b-[0.5px] bg-transparent py-2.5 text-base text-white placeholder:text-white/30 focus:border-accent focus:outline-none md:text-base"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.15)' }}
                  placeholder="Tell us about your project..."
                />
              </div>

              <div
                className={`pt-4 transition-all duration-700 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: "650ms" }}
              >
                <MagneticButton
                  variant="primary"
                  className="w-full text-sm disabled:opacity-50 md:text-sm"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </MagneticButton>
                {submitStatus === "success" && (
                  <p className="mt-3 text-center font-mono text-[10px] text-accent md:text-xs">Message sent successfully!</p>
                )}
                {submitStatus === "error" && (
                  <p className="mt-3 text-center font-mono text-[10px] text-red-400 md:text-xs">Failed to send. Please try again.</p>
                )}
              </div>
            </form>

            {/* Mobile-only social links */}
            <div
              className={`mt-8 flex justify-center gap-6 transition-all duration-700 md:hidden ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "800ms" }}
            >
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-white/50 transition-all hover:text-accent"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer note - Hidden on mobile */}
        <div
          className={`hidden text-center transition-all duration-700 sm:mt-10 sm:block md:mt-16 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <p className="font-mono text-[10px] text-white/30 sm:text-xs">
            © {new Date().getFullYear()} Lucci. The economic layer for open source.
          </p>
        </div>
      </div>
    </section>
  )
}

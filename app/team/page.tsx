"use client"

import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { MagneticButton } from "@/components/magnetic-button"
import { TEAM_MEMBERS } from "@/lib/data/team"
import { SOCIAL_LINKS } from "@/lib/constants/social"
import Link from "next/link"
import Image from "next/image"
import { useState, type FormEvent } from "react"

export default function TeamPage() {
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
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#0a1a19]">
      <CustomCursor />
      <GrainOverlay />

      {/* Gradient Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1a19] via-[#0d2220] to-[#0a1a19]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#00524d]/20 via-transparent to-transparent" />
      </div>

      {/* Navigation */}
      <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-4 py-4 md:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 transition-transform hover:scale-105"
        >
          <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-white/10 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/20">
            <Image
              src="/og.png"
              alt="Lucci Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <span className="font-sans text-base font-semibold tracking-tight text-white">Lucci</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="group relative font-sans text-xs font-medium text-white/70 transition-colors hover:text-white"
          >
            Home
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link
            href="/Work"
            className="group relative font-sans text-xs font-medium text-white/70 transition-colors hover:text-white"
          >
            Work
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link
            href="/team"
            className="group relative font-sans text-xs font-medium text-white"
          >
            Team
            <span className="absolute -bottom-1 left-0 h-px w-full bg-white" />
          </Link>
        </div>

        <Link href="/Work">
          <MagneticButton variant="secondary">
            Explore Work
          </MagneticButton>
        </Link>
      </nav>

      {/* Content */}
      <div className="relative z-10 pt-24 pb-12 md:pt-28 md:pb-16">
        {/* Hero Section */}
        <section className="px-4 md:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="max-w-xl">
              <div className="mb-3 inline-block animate-in fade-in slide-in-from-bottom-4 rounded-full bg-white/25 px-3 py-1 backdrop-blur-md duration-700">
                <p className="font-mono text-[10px] text-white/80">About Us</p>
              </div>
              <h1 className="mb-4 animate-in fade-in slide-in-from-bottom-8 font-sans text-2xl font-light leading-[1.15] tracking-tight text-white duration-1000 md:text-3xl lg:text-4xl">
                Meet the <span className="text-accent">Team</span>
              </h1>
              <p className="mb-6 max-w-md animate-in fade-in slide-in-from-bottom-4 text-xs leading-relaxed text-white/70 duration-1000 delay-200 md:text-sm">
                Building the economic layer for open source. We believe every line of code should be valued, 
                and every contributor should be paid.
              </p>
            </div>
        </div>
        </section>

        {/* Team Members */}
        <section className="mt-10 px-4 md:mt-14 md:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-4 md:grid-cols-2 md:gap-6">
              {TEAM_MEMBERS.map((member, index) => (
                <div
                  key={member.name}
                  className="group rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/10 md:p-5"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full md:h-16 md:w-16">
                    <Image
                      src={member.image}
                        alt={member.name}
                      fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                    <div className="flex-1">
                      <h3 className="mb-1 font-sans text-base font-light text-white md:text-lg">
                        {member.name}
                      </h3>
                      <div className="space-y-0.5">
                        <a
                          href={`mailto:${member.email}`}
                          className="flex items-center gap-1.5 font-mono text-[10px] text-white/50 transition-colors hover:text-accent"
                        >
                          <svg className="h-2.5 w-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                          {member.email}
                        </a>
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 font-mono text-[10px] text-white/50 transition-colors hover:text-accent"
                        >
                          <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                          </svg>
                          GitHub
                        </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mt-12 px-4 md:mt-16 md:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-6 md:grid-cols-2 md:gap-10">
              {/* Left side - Info */}
              <div>
                <h2 className="mb-3 font-sans text-xl font-light text-white md:text-2xl">
                  Get in <span className="text-accent">Touch</span>
                </h2>
                <p className="mb-5 text-xs text-white/70 md:text-sm">
                  Have questions or want to collaborate? We'd love to hear from you.
                </p>
                
                <div className="space-y-3">
            <a
              href="mailto:contact@luccilabs.xyz"
                    className="group flex items-center gap-2 transition-colors"
            >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5">
                      <svg className="h-3 w-3 text-white/50 transition-colors group-hover:text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
                    </div>
                    <span className="text-xs text-white/70 transition-colors group-hover:text-accent">
              contact@luccilabs.xyz
                    </span>
                  </a>
                  
                  <a
                    href="https://github.com/lucci-xyz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 transition-colors"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5">
                      <svg className="h-3 w-3 text-white/50 transition-colors group-hover:text-accent" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-xs text-white/70 transition-colors group-hover:text-accent">
                      github.com/lucci-xyz
                    </span>
                  </a>
                </div>

                <div className="mt-5 flex gap-2">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all hover:border-accent hover:text-accent"
                    >
                      <span className="sr-only">{social.name}</span>
                      <div className="h-3 w-3">{social.icon}</div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Right side - Form */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md md:p-5">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="mb-1 block font-mono text-[9px] text-white/50">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full border-b border-white/20 bg-transparent py-1.5 text-xs text-white placeholder:text-white/30 focus:border-accent focus:outline-none"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block font-mono text-[9px] text-white/50">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full border-b border-white/20 bg-transparent py-1.5 text-xs text-white placeholder:text-white/30 focus:border-accent focus:outline-none"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block font-mono text-[9px] text-white/50">Message</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="w-full border-b border-white/20 bg-transparent py-1.5 text-xs text-white placeholder:text-white/30 focus:border-accent focus:outline-none resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <MagneticButton
                    variant="primary"
                    className="w-full"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </MagneticButton>

                  {submitSuccess && (
                    <p className="text-center font-mono text-[10px] text-accent">Message sent successfully!</p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 px-4 md:mt-20 md:px-8">
          <div className="mx-auto max-w-4xl border-t border-white/10 pt-6">
            <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
              <p className="font-mono text-[9px] text-white/30">
                © {new Date().getFullYear()} Lucci. The economic layer for open source.
              </p>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] text-white/30 transition-colors hover:text-accent"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
          </div>
          </div>
        </footer>
      </div>
    </main>
  )
}

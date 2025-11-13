import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Container from '@/components/Container'
import Section from '@/components/Section'
import { TEAM_MEMBERS } from '@/lib/data/team'
import { COLORS } from '@/lib/constants/theme'

export const metadata = { title: 'Team — Lucci' }

export default function TeamPage() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50/50 via-white to-white">
        <Container>
          <Section>
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-light tracking-wide text-ink">
                Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-bounty via-bounty-light to-bounty-lighter font-normal">Team</span>
              </h1>
              <p className="mt-6 text-base md:text-lg text-ink/60 font-light leading-relaxed">
                Building the economic layer for open source
              </p>
            </div>
          </Section>
        </Container>
      </div>

      {/* Team Members */}
      <Container>
        <Section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.name}
                className="rounded-2xl border border-black/5 p-8 bg-white hover:border-black/10 transition-all"
              >
                <h3 className="text-2xl font-light text-ink mb-4">{member.name}</h3>
                <div className="space-y-2 text-sm text-ink/60">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    <a href={`mailto:${member.email}`} className="hover:text-ink transition">
                      {member.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-ink transition"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </Container>

      {/* Contact Section */}
      <Container>
        <Section>
          <div className="rounded-2xl border border-black/5 p-8 bg-white text-center">
            <h2 className="text-2xl font-light text-ink mb-4">Get in Touch</h2>
            <p className="text-ink/60 mb-6 font-light">
              Have questions or want to collaborate? Reach out to us.
            </p>
            <a
              href="mailto:contact@luccilabs.xyz"
              className="inline-flex items-center gap-2 text-ink/70 hover:text-ink transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              contact@luccilabs.xyz
            </a>
          </div>
        </Section>
      </Container>
      <Footer bgColor={COLORS.white} />
    </>
  )
}

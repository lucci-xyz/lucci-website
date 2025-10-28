'use client'

import { useEffect, useState } from 'react'
import { Users, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const partners = [
  { name: 'Ethereum Foundation', logo: '⟠', category: 'Infrastructure' },
  { name: 'Chainlink', logo: '⬡', category: 'Oracle' },
  { name: 'Polygon', logo: '▽', category: 'Scaling' },
  { name: 'Optimism', logo: '◯', category: 'L2' },
  { name: 'Arbitrum', logo: '△', category: 'L2' },
  { name: 'The Graph', logo: '◈', category: 'Indexing' },
  { name: 'IPFS', logo: '⬢', category: 'Storage' },
  { name: 'Filecoin', logo: '◆', category: 'Storage' },
]

const testimonials = [
  {
    quote: "Lucci Labs has been instrumental in pushing the boundaries of what's possible in DeFi. Their innovative approach to cross-chain infrastructure has opened up new possibilities for our ecosystem.",
    author: "Alex Chen",
    role: "CTO, DeFi Protocol",
    company: "Nexus Finance",
  },
  {
    quote: "The team at Lucci Labs combines technical excellence with a deep understanding of cryptographic principles. Their zero-knowledge proof implementations are industry-leading.",
    author: "Sarah Johnson",
    role: "Research Lead",
    company: "Cipher Systems",
  },
]

export default function Partners() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('partners')
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])

  return (
    <section id="partners" className="relative py-24 overflow-hidden">
      <div className="container-width section-padding">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className={cn(
            'inline-flex items-center space-x-2 px-4 py-2 glass-effect rounded-full mb-4 transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            <Users className="w-4 h-4 text-lucci-400" />
            <span className="text-sm text-neutral-300">Ecosystem</span>
          </div>
          <h2 className={cn(
            'text-4xl md:text-5xl font-bold mb-4 transition-all duration-700 delay-100',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            Trusted by the Best
          </h2>
          <p className={cn(
            'text-xl text-neutral-400 max-w-2xl mx-auto transition-all duration-700 delay-200',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            Collaborating with leading protocols and organizations to build the future of Web3
          </p>
        </div>

        {/* Partners Grid */}
        <div className={cn(
          'grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 transition-all duration-700 delay-300',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        )}>
          {partners.map((partner, index) => (
            <div
              key={partner.name}
              className="group glass-effect rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300"
              style={{
                animationDelay: isVisible ? `${400 + index * 50}ms` : '0ms',
              }}
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {partner.logo}
              </div>
              <h3 className="font-medium mb-1">{partner.name}</h3>
              <p className="text-xs text-neutral-500">{partner.category}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className={cn(
              'text-2xl font-semibold mb-2 transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
            style={{ transitionDelay: isVisible ? '600ms' : '0ms' }}>
              What Our Partners Say
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={cn(
                  'glass-effect rounded-2xl p-8 relative transition-all duration-700',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                )}
                style={{
                  transitionDelay: isVisible ? `${700 + index * 100}ms` : '0ms',
                }}
              >
                <Sparkles className="absolute top-8 right-8 w-6 h-6 text-lucci-400/30" />
                <blockquote className="mb-6">
                  <p className="text-lg text-neutral-300 italic">
                    "{testimonial.quote}"
                  </p>
                </blockquote>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-neutral-500">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={cn(
          'text-center glass-effect rounded-2xl p-12 transition-all duration-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        )}
        style={{ transitionDelay: isVisible ? '900ms' : '0ms' }}>
          <h3 className="text-2xl font-semibold mb-4">Join the Lucci Labs Ecosystem</h3>
          <p className="text-neutral-400 mb-8 max-w-2xl mx-auto">
            Whether you're building a protocol, researching new primitives, or looking to integrate cutting-edge technology, 
            we'd love to collaborate.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="mailto:partners@luccilabs.com"
              className="px-6 py-3 bg-gradient-to-r from-lucci-500 to-lucci-600 rounded-lg font-medium hover:from-lucci-600 hover:to-lucci-700 transition-all duration-200"
            >
              Become a Partner
            </a>
            <a
              href="/ecosystem"
              className="px-6 py-3 glass-effect rounded-lg font-medium glass-effect-hover"
            >
              Explore Ecosystem
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

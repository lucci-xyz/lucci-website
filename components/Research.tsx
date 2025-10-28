'use client'

import { useEffect, useState } from 'react'
import { Code2, Database, Lock, Cpu, Network, Layers } from 'lucide-react'
import { cn } from '@/lib/utils'

const researchAreas = [
  {
    icon: Lock,
    title: 'Zero-Knowledge Proofs',
    description: 'Pioneering privacy-preserving protocols using cutting-edge ZK technology.',
    color: 'from-lucci-400 to-lucci-600',
  },
  {
    icon: Network,
    title: 'Cross-Chain Infrastructure',
    description: 'Building bridges between isolated blockchain ecosystems for true interoperability.',
    color: 'from-accent-cyan to-blue-600',
  },
  {
    icon: Database,
    title: 'Decentralized Storage',
    description: 'Developing efficient and secure distributed storage solutions for Web3.',
    color: 'from-accent-lime to-green-600',
  },
  {
    icon: Cpu,
    title: 'MEV Research',
    description: 'Exploring maximal extractable value patterns and mitigation strategies.',
    color: 'from-accent-orange to-orange-600',
  },
  {
    icon: Code2,
    title: 'Smart Contract Security',
    description: 'Formal verification and advanced auditing techniques for bulletproof contracts.',
    color: 'from-accent-pink to-pink-600',
  },
  {
    icon: Layers,
    title: 'Layer 2 Scaling',
    description: 'Optimizing throughput and reducing costs with innovative L2 solutions.',
    color: 'from-purple-500 to-indigo-600',
  },
]

export default function Research() {
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

    const element = document.getElementById('research')
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])

  return (
    <section id="research" className="relative py-24 overflow-hidden">
      <div className="container-width section-padding">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className={cn(
            'inline-flex items-center space-x-2 px-4 py-2 glass-effect rounded-full mb-4 transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            <Code2 className="w-4 h-4 text-lucci-400" />
            <span className="text-sm text-neutral-300">Research & Development</span>
          </div>
          <h2 className={cn(
            'text-4xl md:text-5xl font-bold mb-4 transition-all duration-700 delay-100',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            Pushing Boundaries
          </h2>
          <p className={cn(
            'text-xl text-neutral-400 max-w-2xl mx-auto transition-all duration-700 delay-200',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            We explore uncharted territories in blockchain technology, 
            turning theoretical concepts into practical solutions.
          </p>
        </div>

        {/* Research Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {researchAreas.map((area, index) => (
            <div
              key={area.title}
              className={cn(
                'group relative glass-effect rounded-2xl p-8 hover:bg-white/10 transition-all duration-500',
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8',
              )}
              style={{
                transitionDelay: isVisible ? `${300 + index * 100}ms` : '0ms',
              }}
            >
              {/* Gradient Background on Hover */}
              <div className={cn(
                'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl',
                area.color
              )} />
              
              {/* Icon */}
              <div className={cn(
                'relative w-14 h-14 mb-6 bg-gradient-to-br rounded-xl flex items-center justify-center',
                area.color
              )}>
                <area.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-3 group-hover:text-white transition-colors">
                {area.title}
              </h3>
              <p className="text-neutral-400 group-hover:text-neutral-300 transition-colors">
                {area.description}
              </p>

              {/* Hover Effect Line */}
              <div className={cn(
                'absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl',
                area.color
              )} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={cn(
          'text-center mt-12 transition-all duration-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        )}
        style={{ transitionDelay: isVisible ? '900ms' : '0ms' }}>
          <a
            href="/research"
            className="inline-flex items-center space-x-2 text-lucci-400 hover:text-lucci-300 transition-colors"
          >
            <span>Explore our research papers</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  )
}

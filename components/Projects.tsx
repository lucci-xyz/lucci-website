'use client'

import { useEffect, useState } from 'react'
import { Github, ExternalLink, TrendingUp, Users, Shield, Activity } from 'lucide-react'
import { cn } from '@/lib/utils'

const projects = [
  {
    name: 'Nexus Protocol',
    description: 'Decentralized lending protocol with dynamic interest rates and cross-chain collateral support.',
    status: 'mainnet',
    stats: {
      tvl: '$1.2M',
      users: '2.3k',
      apy: '8.5%',
    },
    tags: ['DeFi', 'Lending', 'Cross-chain'],
    gradient: 'from-lucci-400 to-lucci-600',
    github: 'https://github.com/luccilabs/nexus',
    demo: 'https://nexus.luccilabs.com',
  },
  {
    name: 'Cipher Shield',
    description: 'Privacy-preserving smart wallet using zero-knowledge proofs for anonymous transactions.',
    status: 'testnet',
    stats: {
      tvl: '$450k',
      users: '850',
      apy: '12%',
    },
    tags: ['Privacy', 'ZK-Proofs', 'Wallet'],
    gradient: 'from-accent-cyan to-blue-600',
    github: 'https://github.com/luccilabs/cipher',
    demo: 'https://cipher.luccilabs.com',
  },
  {
    name: 'Quantum Bridge',
    description: 'High-performance cross-chain bridge with built-in MEV protection and instant finality.',
    status: 'beta',
    stats: {
      tvl: '$680k',
      users: '1.1k',
      apy: '6.2%',
    },
    tags: ['Bridge', 'MEV', 'Infrastructure'],
    gradient: 'from-accent-lime to-green-600',
    github: 'https://github.com/luccilabs/quantum',
    demo: 'https://bridge.luccilabs.com',
  },
]

const StatusBadge = ({ status }: { status: string }) => {
  const colors = {
    mainnet: 'bg-green-500/20 text-green-400 border-green-500/30',
    testnet: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    beta: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  }

  return (
    <span className={cn(
      'px-3 py-1 rounded-full text-xs font-medium border',
      colors[status as keyof typeof colors]
    )}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

export default function Projects() {
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

    const element = document.getElementById('projects')
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lucci-500/5 to-transparent" />
      </div>

      <div className="container-width section-padding">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className={cn(
            'inline-flex items-center space-x-2 px-4 py-2 glass-effect rounded-full mb-4 transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            <Activity className="w-4 h-4 text-accent-lime" />
            <span className="text-sm text-neutral-300">Live Projects</span>
          </div>
          <h2 className={cn(
            'text-4xl md:text-5xl font-bold mb-4 transition-all duration-700 delay-100',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            <span className="gradient-text">Building in Production</span>
          </h2>
          <p className={cn(
            'text-xl text-neutral-400 max-w-2xl mx-auto transition-all duration-700 delay-200',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            From experimental protocols to production-ready infrastructure, 
            our projects push the boundaries of what&apos;s possible in Web3.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.name}
              className={cn(
                'group relative glass-effect rounded-2xl p-8 hover:scale-[1.02] transition-all duration-500',
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8',
              )}
              style={{
                transitionDelay: isVisible ? `${300 + index * 150}ms` : '0ms',
              }}
            >
              {/* Gradient Border Effect */}
              <div className={cn(
                'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl',
                project.gradient
              )} />
              
              {/* Header */}
              <div className="relative flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">{project.name}</h3>
                  <StatusBadge status={project.status} />
                </div>
              </div>

              {/* Description */}
              <p className="text-neutral-400 mb-6">
                {project.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <div className="flex items-center space-x-1 text-neutral-500 mb-1">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-xs">TVL</span>
                  </div>
                  <p className="text-lg font-semibold">{project.stats.tvl}</p>
                </div>
                <div>
                  <div className="flex items-center space-x-1 text-neutral-500 mb-1">
                    <Users className="w-4 h-4" />
                    <span className="text-xs">Users</span>
                  </div>
                  <p className="text-lg font-semibold">{project.stats.users}</p>
                </div>
                <div>
                  <div className="flex items-center space-x-1 text-neutral-500 mb-1">
                    <Shield className="w-4 h-4" />
                    <span className="text-xs">APY</span>
                  </div>
                  <p className="text-lg font-semibold">{project.stats.apy}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/5 rounded-lg text-xs text-neutral-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 glass-effect rounded-lg glass-effect-hover"
                >
                  <Github className="w-4 h-4" />
                  <span className="text-sm">Code</span>
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r rounded-lg hover:opacity-90 transition-opacity',
                    project.gradient
                  )}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-sm font-medium">Launch</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

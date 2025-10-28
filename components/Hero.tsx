'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, GitBranch, Shield, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Orbs */}
        <div className="floating-orb w-96 h-96 bg-lucci-500 -top-48 -left-48" />
        <div className="floating-orb w-96 h-96 bg-accent-cyan -bottom-48 -right-48 animation-delay-200" />
        <div className="floating-orb w-64 h-64 bg-accent-lime top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animation-delay-400" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
      </div>

      <div className="container-width section-padding pt-32 pb-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Announcement Badge */}
          <div className={cn(
            'inline-flex items-center space-x-2 px-4 py-2 glass-effect rounded-full mb-8 transition-all duration-700',
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-lime opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-lime"></span>
            </span>
            <span className="text-sm text-neutral-300">New protocol launching Q1 2024</span>
            <ArrowRight className="w-4 h-4 text-neutral-400" />
          </div>

          {/* Main Heading */}
          <h1 className={cn(
            'text-5xl md:text-7xl font-bold mb-6 transition-all duration-700 delay-100',
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            <span className="block">Building the</span>
            <span className="gradient-text">Future of Web3</span>
          </h1>

          {/* Subtitle */}
          <p className={cn(
            'text-xl md:text-2xl text-neutral-400 mb-8 max-w-2xl mx-auto transition-all duration-700 delay-200',
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            An experimental, open-source playground where innovation moves faster than perfection. 
            Exploring the edges of DeFi, cryptography, and decentralized systems.
          </p>

          {/* CTA Buttons */}
          <div className={cn(
            'flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12 transition-all duration-700 delay-300',
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            <Link
              href="#projects"
              className="group px-8 py-4 bg-gradient-to-r from-lucci-500 to-lucci-600 rounded-xl text-lg font-medium hover:from-lucci-600 hover:to-lucci-700 transition-all duration-200 flex items-center space-x-2"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/docs"
              className="px-8 py-4 glass-effect rounded-xl text-lg font-medium glass-effect-hover"
            >
              View Documentation
            </Link>
          </div>

          {/* Stats */}
          <div className={cn(
            'grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 max-w-3xl mx-auto transition-all duration-700 delay-400',
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            <div className="glass-effect rounded-xl p-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <GitBranch className="w-5 h-5 text-lucci-400" />
                <span className="text-3xl font-bold">12+</span>
              </div>
              <p className="text-neutral-400 text-sm">Active Protocols</p>
            </div>
            <div className="glass-effect rounded-xl p-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Shield className="w-5 h-5 text-accent-cyan" />
                <span className="text-3xl font-bold">$2.3M</span>
              </div>
              <p className="text-neutral-400 text-sm">TVL Secured</p>
            </div>
            <div className="glass-effect rounded-xl p-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Zap className="w-5 h-5 text-accent-lime" />
                <span className="text-3xl font-bold">50k+</span>
              </div>
              <p className="text-neutral-400 text-sm">Transactions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center space-y-2 animate-bounce">
          <span className="text-xs text-neutral-500">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-neutral-700 rounded-full p-1">
            <div className="w-1 h-2 bg-neutral-500 rounded-full mx-auto animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}

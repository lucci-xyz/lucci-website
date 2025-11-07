'use client'

import { useEffect, useState, useMemo } from 'react'

// Modern minimalist SVG icons
const AIIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 8V4M8 8v8M16 8v8M12 20v-4" />
    <circle cx="12" cy="12" r="2" />
  </svg>
)

const CodeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
)

const DocsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
)

const PaymentIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
    <path d="M12 18V6" />
  </svg>
)

const MarketingIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
)

export default function AnimatedHero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Generate stable random values for particles
  const particles = useMemo(() => 
    Array.from({ length: 6 }, (_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 4 + Math.random() * 3,
      delay: Math.random() * 2,
    }))
  , [])

  return (
    <div className="relative w-[300px] h-[300px] rounded-2xl overflow-hidden bg-white/30 backdrop-blur-sm border border-primary-100/50 shadow-sm">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-transparent to-bounty-50/30" />

      {/* Central hub - represents the Lucci platform */}
      <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-primary-200/80 to-bounty-200/80 backdrop-blur-sm shadow-lg transition-all duration-1000 ${mounted ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
        <div className="absolute inset-3 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-2xl font-bold bg-gradient-to-br from-primary-500 to-bounty-500 bg-clip-text text-transparent">
          L
        </div>
        {/* Subtle pulse rings */}
        <div className="absolute inset-0 rounded-full border border-primary-300/40 animate-ping" style={{ animationDuration: '4s' }} />
        <div className="absolute inset-0 rounded-full border border-bounty-300/40 animate-ping" style={{ animationDuration: '4s', animationDelay: '2s' }} />
      </div>

      {/* Product nodes with modern icons */}
      {[
        { Icon: AIIcon, label: 'AI', delay: '0s', rotation: 0, radius: 85 },
        { Icon: PaymentIcon, label: 'Pay', delay: '0.15s', rotation: 72, radius: 85 },
        { Icon: DocsIcon, label: 'Docs', delay: '0.3s', rotation: 144, radius: 85 },
        { Icon: CodeIcon, label: 'Code', delay: '0.45s', rotation: 216, radius: 85 },
        { Icon: MarketingIcon, label: 'Market', delay: '0.6s', rotation: 288, radius: 85 },
      ].map((node, i) => {
        const x = Math.cos((node.rotation * Math.PI) / 180) * node.radius + 150
        const y = Math.sin((node.rotation * Math.PI) / 180) * node.radius + 150
        
        return (
          <div
            key={i}
            className={`absolute w-11 h-11 rounded-xl bg-white/80 backdrop-blur-sm border border-primary-200/50 shadow-sm flex items-center justify-center transition-all duration-1000 hover:scale-110 hover:shadow-md`}
            style={{
              left: `${x - 22}px`,
              top: `${y - 22}px`,
              transitionDelay: node.delay,
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'scale(1)' : 'scale(0)',
            }}
          >
            <div className="text-primary-600">
              <node.Icon />
            </div>
          </div>
        )
      })}

      {/* Animated connection lines - softer colors */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {[0, 72, 144, 216, 288].map((rotation, i) => {
          const x1 = 150
          const y1 = 150
          const x2 = Math.cos((rotation * Math.PI) / 180) * 85 + 150
          const y2 = Math.sin((rotation * Math.PI) / 180) * 85 + 150
          
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="url(#lineGradient)"
              strokeWidth="1.5"
              className={`transition-all duration-1000`}
              style={{
                strokeDasharray: mounted ? '0' : '200',
                strokeDashoffset: mounted ? '0' : '200',
                transitionDelay: `${i * 0.15}s`,
                opacity: mounted ? 0.2 : 0,
              }}
            />
          )
        })}
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C0CCFF" />
            <stop offset="100%" stopColor="#9DEBE7" />
          </linearGradient>
        </defs>
      </svg>

      {/* Subtle floating particles - softer appearance */}
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-primary-300/40"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animation: `floatParticle ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      {/* Minimalist crypto symbols with softer styling */}
      <div className="absolute top-8 right-8 text-lg text-primary-400/60" style={{ animation: 'floatIcon 4s ease-in-out infinite', animationDelay: '0.5s' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      </div>
      <div className="absolute bottom-10 left-10 text-base text-bounty-400/60" style={{ animation: 'floatIcon 3.5s ease-in-out infinite', animationDelay: '1s' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
          <path d="M12 18V6" />
        </svg>
      </div>
      <div className="absolute top-16 left-12 text-sm text-primary-300/60" style={{ animation: 'floatIcon 5s ease-in-out infinite', animationDelay: '1.5s' }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      </div>

      <style jsx>{`
        @keyframes floatParticle {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-8px) translateX(4px);
          }
        }
        @keyframes floatIcon {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-6px) translateX(3px);
          }
        }
      `}</style>
    </div>
  )
}

'use client'

import { useEffect, useState, useMemo } from 'react'

export default function AnimatedHero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Generate stable random values for particles
  const particles = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }))
  , [])

  return (
    <div className="relative w-[300px] h-[300px] rounded-2xl overflow-hidden bg-gradient-to-br from-primary-100 via-bounty-100 to-purple-100">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%">
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-ink" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Central hub - represents the Lucci platform */}
      <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-bounty-500 shadow-lg transition-all duration-1000 ${mounted ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
        <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center text-2xl font-bold bg-gradient-to-br from-primary-500 to-bounty-500 bg-clip-text text-transparent">
          L
        </div>
        {/* Pulse rings */}
        <div className="absolute inset-0 rounded-full border-2 border-primary-400 animate-ping opacity-75" style={{ animationDuration: '3s' }} />
        <div className="absolute inset-0 rounded-full border-2 border-bounty-400 animate-ping opacity-75" style={{ animationDuration: '3s', animationDelay: '1s' }} />
      </div>

      {/* AI Agent nodes - positioned around the hub */}
      {[
        { icon: '🤖', label: 'AI', delay: '0s', rotation: 0, radius: 80, color: 'from-blue-400 to-blue-600' },
        { icon: '💰', label: 'Pay', delay: '0.2s', rotation: 72, radius: 80, color: 'from-green-400 to-green-600' },
        { icon: '📝', label: 'Docs', delay: '0.4s', rotation: 144, radius: 80, color: 'from-purple-400 to-purple-600' },
        { icon: '💻', label: 'Code', delay: '0.6s', rotation: 216, radius: 80, color: 'from-orange-400 to-orange-600' },
        { icon: '📊', label: 'Market', delay: '0.8s', rotation: 288, radius: 80, color: 'from-pink-400 to-pink-600' },
      ].map((node, i) => {
        const x = Math.cos((node.rotation * Math.PI) / 180) * node.radius + 150
        const y = Math.sin((node.rotation * Math.PI) / 180) * node.radius + 150
        
        return (
          <div
            key={i}
            className={`absolute w-12 h-12 rounded-lg bg-gradient-to-br ${node.color} shadow-md flex flex-col items-center justify-center text-xs font-medium text-white transition-all duration-1000`}
            style={{
              left: `${x - 24}px`,
              top: `${y - 24}px`,
              transitionDelay: node.delay,
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'scale(1)' : 'scale(0)',
            }}
          >
            <span className="text-lg">{node.icon}</span>
          </div>
        )
      })}

      {/* Animated connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {[0, 72, 144, 216, 288].map((rotation, i) => {
          const x1 = 150
          const y1 = 150
          const x2 = Math.cos((rotation * Math.PI) / 180) * 80 + 150
          const y2 = Math.sin((rotation * Math.PI) / 180) * 80 + 150
          
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="url(#lineGradient)"
              strokeWidth="2"
              className={`transition-all duration-1000`}
              style={{
                strokeDasharray: mounted ? '0' : '200',
                strokeDashoffset: mounted ? '0' : '200',
                transitionDelay: `${i * 0.2}s`,
                opacity: mounted ? 0.3 : 0,
              }}
            />
          )
        })}
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6D8AFF" />
            <stop offset="100%" stopColor="#1F807B" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating particles - representing transactions/data */}
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary-400"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animation: `float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
            opacity: 0.6,
          }}
        />
      ))}

      {/* Cryptocurrency symbols floating around */}
      <div className="absolute top-6 right-6 text-2xl opacity-70 animate-bounce" style={{ animationDuration: '3s', animationDelay: '0.5s' }}>
        Ξ
      </div>
      <div className="absolute bottom-8 left-8 text-xl opacity-70 animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '1s' }}>
        ₿
      </div>
      <div className="absolute top-12 left-6 text-lg opacity-70 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1.5s' }}>
        $
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-10px) translateX(5px);
          }
          50% {
            transform: translateY(-5px) translateX(-5px);
          }
          75% {
            transform: translateY(-15px) translateX(10px);
          }
        }
      `}</style>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

// Ultra minimalist abstract SVG icons - simple geometric shapes
const AIIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" />
  </svg>
)

const CodeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
)

const DocsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
    <polyline points="13 2 13 9 20 9" />
  </svg>
)

const PaymentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v12M15 9h-6a3 3 0 1 0 0 6h6" />
  </svg>
)

const MarketingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
)

export default function AnimatedHero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative w-[300px] h-[300px]">
      {/* Central og.png image */}
      <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${mounted ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
        <Image
          src="/og.png"
          alt="Lucci"
          width={120}
          height={100}
          className="object-contain"
        />
      </div>

      {/* Abstract minimalist icons - no backgrounds */}
      {[
        { Icon: AIIcon, label: 'AI', delay: '0s', rotation: 0, radius: 110 },
        { Icon: PaymentIcon, label: 'Pay', delay: '0.1s', rotation: 72, radius: 110 },
        { Icon: DocsIcon, label: 'Docs', delay: '0.2s', rotation: 144, radius: 110 },
        { Icon: CodeIcon, label: 'Code', delay: '0.3s', rotation: 216, radius: 110 },
        { Icon: MarketingIcon, label: 'Market', delay: '0.4s', rotation: 288, radius: 110 },
      ].map((node, i) => {
        const x = Math.cos((node.rotation * Math.PI) / 180) * node.radius + 150
        const y = Math.sin((node.rotation * Math.PI) / 180) * node.radius + 150
        
        return (
          <div
            key={i}
            className={`absolute transition-all duration-1000 hover:scale-125`}
            style={{
              left: `${x - 12}px`,
              top: `${y - 12}px`,
              transitionDelay: node.delay,
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'scale(1)' : 'scale(0)',
            }}
          >
            <div className="text-primary-400/70 hover:text-primary-500">
              <node.Icon />
            </div>
          </div>
        )
      })}

      {/* Animated connection lines - very subtle */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {[0, 72, 144, 216, 288].map((rotation, i) => {
          const x1 = 150
          const y1 = 150
          const x2 = Math.cos((rotation * Math.PI) / 180) * 110 + 150
          const y2 = Math.sin((rotation * Math.PI) / 180) * 110 + 150
          
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="url(#lineGradient)"
              strokeWidth="1"
              className={`transition-all duration-1000`}
              style={{
                strokeDasharray: mounted ? '0' : '200',
                strokeDashoffset: mounted ? '0' : '200',
                transitionDelay: `${i * 0.1}s`,
                opacity: mounted ? 0.15 : 0,
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
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'

export default function PhoneNotification() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <div className="relative w-full max-w-[340px]">
      {/* Spotlight glow effect */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-48 w-48 rounded-full bg-cyan-500/8 blur-3xl" />
      </div>

      <div
        role="alert"
        aria-live="polite"
        className={[
          "relative w-full rounded-2xl border border-black/5 bg-white backdrop-blur-sm",
          "shadow-[0_24px_80px_-16px_rgba(0,0,0,0.32),0_10px_32px_-8px_rgba(0,0,0,0.18)]",
          "p-4",
          mounted ? "animate-[slideDown_400ms_ease-out,fadeIn_300ms_ease-out]" : "opacity-0 -translate-y-4"
        ].join(' ')}
      >
        <div className="mb-2 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-900 text-white shadow-lg">
            {/* GitHub mark */}
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.21 11.39c.58.1.79-.25.79-.57v-2.24c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.31.76-1.61-2.66-.31-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23.96-.26 1.98-.4 3-.4s2.04.14 3 .4c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.84 1.1.84 2.22v3.29c0 .32.19.7.8.58A12 12 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2 mb-0.5">
              <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wide">GitHub • now</span>
            </div>
            <p className="line-clamp-2 text-base leading-snug font-semibold text-gray-900">
              @Ethereum just paid you $100 bounty
            </p>
          </div>
        </div>
        <div className="text-xs text-gray-500 pl-14">
          Payment received via USDC for PR #1337
        </div>
        
        {/* Subtle accent border */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-cyan-500/10" />
      </div>

      {/* keyframes */}
      <style jsx>{`
        @keyframes fadeIn { 
          from { opacity: 0 } 
          to { opacity: 1 } 
        }
        @keyframes slideDown { 
          from { transform: translateY(-12px) scale(0.96) } 
          to { transform: translateY(0) scale(1) } 
        }
        @media (prefers-reduced-motion: reduce) {
          div[role="alert"] { 
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  )
}

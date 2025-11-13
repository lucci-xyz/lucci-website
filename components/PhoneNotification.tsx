'use client'

import { useEffect, useState } from 'react'
import { NOTIFICATION_DATA } from '@/lib/data/notifications'
import { SHADOWS } from '@/lib/constants/theme'

/**
 * Phone notification component that cycles through payment notifications
 * Displays mock payment notifications with smooth transitions
 */

export default function PhoneNotification() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    // Cycle through notifications every 2.5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % NOTIFICATION_DATA.length)
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full">
      {/* Spotlight glow effect */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center -z-10">
        <div className="h-64 w-64 rounded-full bg-cyan-500/8 blur-3xl" />
      </div>

      <div className="relative">
        {NOTIFICATION_DATA.map((notification, index) => {
          return (
            <div
              key={index}
              role="alert"
              aria-live="polite"
              className={[
                "absolute top-0 left-0 w-full rounded-2xl sm:rounded-3xl border border-black/5 bg-white backdrop-blur-sm",
                "p-3 sm:p-4 md:p-5 lg:p-6 transition-all duration-700 ease-in-out",
                currentIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-95"
              ].join(' ')}
              style={{ boxShadow: SHADOWS.notification }}
            >
              <div className="mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3 md:gap-4">
                <div className={`flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 items-center justify-center rounded-lg sm:rounded-xl ${notification.bgColor} ${notification.iconSize} ${notification.bgColor === 'bg-white' ? 'shadow-[0_4px_12px_rgba(0,0,0,0.15),0_2px_4px_rgba(0,0,0,0.1)]' : 'shadow-lg'} overflow-hidden flex-shrink-0`}>
                  <img 
                    src={notification.icon} 
                    alt={notification.platform}
                    className={`h-full w-full ${notification.platform === 'Ethereum' ? 'object-contain' : 'object-cover'}`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-1 sm:gap-2 mb-0.5 sm:mb-1">
                    <span className="text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-wide">{notification.platform} • now</span>
                  </div>
                  <p className="line-clamp-2 text-sm sm:text-base md:text-lg leading-snug font-semibold text-gray-900">
                    {notification.from} just paid you {notification.amount}
                  </p>
                </div>
              </div>
              <div className="text-xs sm:text-sm text-gray-500 pl-12 sm:pl-[3.75rem] md:pl-[4.5rem]">
                {notification.detail}
              </div>
              
              {/* Subtle accent border */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl sm:rounded-3xl ring-1 ring-inset ring-cyan-500/10" />
            </div>
          )
        })}
        
        {/* Invisible spacer to maintain height */}
        <div className="invisible rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-5 lg:p-6">
          <div className="mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3 md:gap-4">
            <div className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-lg sm:rounded-xl flex-shrink-0" />
            <div className="flex-1">
              <div className="h-3 mb-0.5 sm:mb-1" />
              <div className="h-4 sm:h-5" />
            </div>
          </div>
          <div className="h-3 sm:h-4 pl-12 sm:pl-[3.75rem] md:pl-[4.5rem]" />
        </div>
      </div>

      {/* keyframes */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          div[role="alert"] { 
            transition: none !important;
          }
        }
      `}</style>
    </div>
  )
}

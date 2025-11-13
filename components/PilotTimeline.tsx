'use client'

import { useEffect, useState } from 'react'
import { TIMELINE_ACTIVITIES } from '@/lib/data/timeline'
import { COLORS } from '@/lib/constants/theme'

/**
 * Pilot timeline component that shows animated activity feed
 * Displays mock AI agent activities with progressive reveal animation
 */

export default function PilotTimeline() {
  const [visibleCount, setVisibleCount] = useState(1)

  useEffect(() => {
    // Show items one by one, then reset
    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= TIMELINE_ACTIVITIES.length) {
          return 1 // Reset to show first item only
        }
        return prev + 1
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full">
      {/* Spotlight glow effect */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center -z-10">
        <div className="h-48 w-48 rounded-full bg-teal-500/8 blur-3xl" />
      </div>

      <div className="relative rounded-xl sm:rounded-2xl border border-black/5 bg-white backdrop-blur-sm shadow-[0_16px_48px_-8px_rgba(0,0,0,0.28),0_8px_24px_-6px_rgba(0,0,0,0.16),0_0_0_1px_rgba(0,0,0,0.05)] p-3 sm:p-4">
        {/* Header */}
        <div className="mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-gray-100">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center flex-shrink-0">
              <img 
                src="/og.png" 
                alt="Pilot Bot"
                className="h-6 w-6 sm:h-7 sm:w-7 object-contain"
              />
            </div>
            <div>
              <h3 className="text-[11px] sm:text-xs font-semibold text-gray-900">Pilot Agent</h3>
              <p className="text-[9px] sm:text-[10px] text-gray-500">Automate everything</p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-0">
          {TIMELINE_ACTIVITIES.map((activity, index) => {
            const isVisible = index < visibleCount
            return (
              <div
                key={index}
                className={[
                  "relative pl-5 sm:pl-6 pb-3 sm:pb-4 last:pb-0 transition-all duration-500 ease-in-out",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                ].join(' ')}
              >
                {/* Timeline line */}
                {index < TIMELINE_ACTIVITIES.length - 1 && (
                  <div 
                    className="absolute left-[8px] sm:left-[9px] top-[18px] sm:top-[20px] w-0.5 h-full transition-all duration-500 ease-in-out"
                    style={{ 
                      backgroundColor: isVisible && index < visibleCount - 1 ? `${COLORS.primary}33` : 'rgba(0, 0, 0, 0.05)',
                    }}
                  />
                )}
                
                {/* Timeline dot */}
                <div 
                  className="absolute left-0 top-0.5 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full transition-all duration-500 ease-in-out shadow-sm"
                  style={{ 
                    background: isVisible ? activity.iconBg : 'rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <div className="scale-75 sm:scale-100">
                    {isVisible && activity.iconSvg}
                  </div>
                </div>

                {/* Content */}
                <div className="min-h-[16px] sm:min-h-[20px]">
                  <div className="flex items-start justify-between gap-1.5 sm:gap-2 mb-0.5">
                    <p className="text-[11px] sm:text-xs font-medium text-gray-900 leading-snug">
                      {activity.title}
                    </p>
                    <span className="text-[9px] sm:text-[10px] text-gray-400 whitespace-nowrap flex-shrink-0">{activity.time}</span>
                  </div>
                  <p className="text-[9px] sm:text-[10px] font-medium" style={{ color: COLORS.primary }}>
                    {activity.detail}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Subtle accent border */}
        <div className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl ring-1 ring-inset ring-teal-500/10" />
      </div>

      {/* keyframes */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          div { 
            transition: none !important;
          }
        }
      `}</style>
    </div>
  )
}


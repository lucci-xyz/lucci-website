'use client'

import { useEffect, useState } from 'react'

const activities = [
  {
    title: 'Pilot posted your release thread on X',
    detail: 'v1.4.0 live',
    icon: '🚀',
    time: '2m ago',
  },
  {
    title: 'Pilot opened a docs PR for the new API',
    detail: 'PR #713',
    icon: '📝',
    time: '15m ago',
  },
  {
    title: 'Pilot launched $BUILD token',
    detail: 'TGE live · LP seeded',
    icon: '💎',
    time: '1h ago',
  },
  {
    title: 'Pilot airdropped $BUILD to 42 contributors',
    detail: 'tx confirmed',
    icon: '🎁',
    time: '2h ago',
  }
]

export default function PilotTimeline() {
  const [visibleCount, setVisibleCount] = useState(1)

  useEffect(() => {
    // Show items one by one, then reset
    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= activities.length) {
          return 1 // Reset to show first item only
        }
        return prev + 1
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full max-w-md">
      {/* Spotlight glow effect */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center -z-10">
        <div className="h-64 w-64 rounded-full bg-teal-500/8 blur-3xl" />
      </div>

      <div className="relative rounded-3xl border border-black/5 bg-white backdrop-blur-sm shadow-[0_24px_80px_-16px_rgba(0,0,0,0.32),0_10px_32px_-8px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.05)] p-6">
        {/* Header */}
        <div className="mb-6 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: 'rgba(0, 130, 123, 0.15)' }}>
              <span className="text-xl">🤖</span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Pilot Activity</h3>
              <p className="text-xs text-gray-500">AI Agent Updates</p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-0">
          {activities.map((activity, index) => {
            const isVisible = index < visibleCount
            return (
              <div
                key={index}
                className={[
                  "relative pl-8 pb-6 last:pb-0 transition-all duration-500 ease-in-out",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                ].join(' ')}
              >
                {/* Timeline line */}
                {index < activities.length - 1 && (
                  <div 
                    className="absolute left-[11px] top-[26px] w-0.5 h-full transition-all duration-500 ease-in-out"
                    style={{ 
                      backgroundColor: isVisible && index < visibleCount - 1 ? 'rgba(0, 130, 123, 0.2)' : 'rgba(0, 0, 0, 0.05)',
                    }}
                  />
                )}
                
                {/* Timeline dot */}
                <div 
                  className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full transition-all duration-500 ease-in-out text-sm"
                  style={{ 
                    backgroundColor: isVisible ? 'rgba(0, 130, 123, 0.15)' : 'rgba(0, 0, 0, 0.05)',
                  }}
                >
                  {activity.icon}
                </div>

                {/* Content */}
                <div className="min-h-[24px]">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-sm font-medium text-gray-900 leading-snug">
                      {activity.title}
                    </p>
                    <span className="text-xs text-gray-400 whitespace-nowrap">{activity.time}</span>
                  </div>
                  <p className="text-xs font-medium" style={{ color: '#00827B' }}>
                    {activity.detail}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Subtle accent border */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-teal-500/10" />
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


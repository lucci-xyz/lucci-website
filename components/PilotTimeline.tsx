'use client'

import { useEffect, useState } from 'react'

const activities = [
  {
    title: 'Pilot posted your release thread on X',
    detail: 'v1.4.0 live',
    iconBg: '#D9F7FF',
    iconSvg: (
      <svg className="w-2.5 h-2.5" fill="#1a1a1a" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    time: '2m ago',
  },
  {
    title: 'Pilot opened a docs PR for the new API',
    detail: 'PR #713',
    iconBg: '#D9F7FF',
    iconSvg: (
      <svg className="w-2.5 h-2.5" fill="#1a1a1a" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
      </svg>
    ),
    time: '15m ago',
  },
  {
    title: 'Pilot launched $BUILD token',
    detail: 'TGE live · LP seeded',
    iconBg: '#D9F7FF',
    iconSvg: (
      <svg className="w-2.5 h-2.5" fill="#1a1a1a" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
    ),
    time: '1h ago',
  },
  {
    title: 'Pilot airdropped $BUILD to 42 contributors',
    detail: 'tx confirmed',
    iconBg: '#D9F7FF',
    iconSvg: (
      <svg className="w-2.5 h-2.5" fill="#1a1a1a" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.89-8.9c.32-.38.51-.86.51-1.39 0-1.2-.97-2.17-2.17-2.17h-2.67v8.67h3.08c1.2 0 2.17-.97 2.17-2.17 0-.85-.49-1.58-1.19-1.94h.27zm-3.44-1.81h1.62c.43 0 .79.36.79.79s-.36.79-.79.79h-1.62v-1.58zm1.97 5.19h-1.97v-1.58h1.97c.43 0 .79.36.79.79s-.36.79-.79.79z"/>
      </svg>
    ),
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
    <div className="relative w-full max-w-sm">
      {/* Spotlight glow effect */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center -z-10">
        <div className="h-48 w-48 rounded-full bg-teal-500/8 blur-3xl" />
      </div>

      <div className="relative rounded-2xl border border-black/5 bg-white backdrop-blur-sm shadow-[0_16px_48px_-8px_rgba(0,0,0,0.28),0_8px_24px_-6px_rgba(0,0,0,0.16),0_0_0_1px_rgba(0,0,0,0.05)] p-4">
        {/* Header */}
        <div className="mb-4 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center">
              <img 
                src="/og.png" 
                alt="Pilot Bot"
                className="h-7 w-7 object-contain"
              />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-900">Pilot Agent</h3>
              <p className="text-[10px] text-gray-500">Automate everything</p>
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
                  "relative pl-6 pb-4 last:pb-0 transition-all duration-500 ease-in-out",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                ].join(' ')}
              >
                {/* Timeline line */}
                {index < activities.length - 1 && (
                  <div 
                    className="absolute left-[9px] top-[20px] w-0.5 h-full transition-all duration-500 ease-in-out"
                    style={{ 
                      backgroundColor: isVisible && index < visibleCount - 1 ? 'rgba(0, 130, 123, 0.2)' : 'rgba(0, 0, 0, 0.05)',
                    }}
                  />
                )}
                
                {/* Timeline dot */}
                <div 
                  className="absolute left-0 top-0.5 flex h-5 w-5 items-center justify-center rounded-full transition-all duration-500 ease-in-out shadow-sm"
                  style={{ 
                    background: isVisible ? activity.iconBg : 'rgba(0, 0, 0, 0.05)',
                  }}
                >
                  {isVisible && activity.iconSvg}
                </div>

                {/* Content */}
                <div className="min-h-[20px]">
                  <div className="flex items-start justify-between gap-2 mb-0.5">
                    <p className="text-xs font-medium text-gray-900 leading-snug">
                      {activity.title}
                    </p>
                    <span className="text-[10px] text-gray-400 whitespace-nowrap">{activity.time}</span>
                  </div>
                  <p className="text-[10px] font-medium" style={{ color: '#00827B' }}>
                    {activity.detail}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Subtle accent border */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-teal-500/10" />
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


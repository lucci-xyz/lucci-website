'use client'

export default function PhoneNotification() {
  return (
    <div className="relative mx-auto w-full max-w-[320px]">
      {/* iPhone Frame */}
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-[3rem] p-3 shadow-2xl">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-3xl z-10" />
        
        {/* Screen */}
        <div className="relative bg-gradient-to-b from-blue-50 to-purple-50 rounded-[2.5rem] overflow-hidden">
          {/* Status Bar */}
          <div className="flex items-center justify-between px-8 pt-4 pb-2 text-xs font-medium text-gray-900">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <svg className="w-6 h-3" fill="currentColor" viewBox="0 0 24 24">
                <rect x="1" y="4" width="18" height="13" rx="2" />
                <path d="M21 9v6a1.5 1.5 0 001.5 0V9a1.5 1.5 0 00-1.5 0z" />
              </svg>
            </div>
          </div>

          {/* Notification Content */}
          <div className="px-4 pb-8 pt-32 min-h-[580px]">
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg p-4 border border-black/5 animate-slide-in">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-purple-400 rounded-xl flex items-center justify-center shadow-md">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold text-gray-900">BountyPay</p>
                    <span className="text-xs text-gray-500">now</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900 mb-1">Payment Received</p>
                  <p className="text-sm text-gray-600">You received $250 USDC for PR #1234</p>
                </div>
              </div>
            </div>
            
            {/* Background apps blur */}
            <div className="mt-6 space-y-3 opacity-30">
              <div className="bg-white/60 backdrop-blur rounded-xl p-3 h-16" />
              <div className="bg-white/60 backdrop-blur rounded-xl p-3 h-16" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

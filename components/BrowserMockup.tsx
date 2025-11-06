'use client'

type Props = {
  url?: string
  children?: React.ReactNode
}

export default function BrowserMockup({ url = "bountypay.app/install", children }: Props) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Browser Chrome */}
      <div className="bg-gradient-to-b from-gray-100 to-gray-200 rounded-t-xl border border-gray-300 shadow-lg">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300">
          {/* Window Controls */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          
          {/* Address Bar */}
          <div className="flex-1 mx-4">
            <div className="bg-white rounded-lg px-4 py-1.5 flex items-center gap-2 shadow-sm">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-sm text-gray-600">{url}</span>
            </div>
          </div>
          
          {/* Right Controls */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gray-300" />
            <div className="w-6 h-6 rounded bg-gray-300" />
          </div>
        </div>
      </div>
      
      {/* Browser Content */}
      <div className="bg-white border-x border-b border-gray-300 rounded-b-xl shadow-lg overflow-hidden">
        {children || (
          <div className="p-12 text-center bg-gradient-to-br from-primary/5 via-purple-50 to-pink-50">
            <div className="max-w-md mx-auto space-y-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-purple-400 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Install BountyPay</h3>
                <p className="text-gray-600">Add BountyPay to your GitHub to start paying contributors</p>
              </div>
              <button className="bg-gradient-to-r from-primary to-purple-400 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow">
                Install Now
              </button>
              <p className="text-xs text-gray-500">Free • Works with any GitHub repository</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

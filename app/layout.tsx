import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lucci — The Economic Layer for Open Source',
  description: 'The economic layer for open source. Pay contributors in stablecoins with BountyPay and automate everything outside the repo with Pilot.',
  openGraph: {
    title: 'Lucci — The Economic Layer for Open Source',
    description: 'The economic layer for open source. Pay contributors in stablecoins with BountyPay and automate everything outside the repo with Pilot.',
    images: ['/og.png']
  },
  icons: { icon: '/og.png' }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans text-ink antialiased bg-white overflow-x-hidden">
        <div className="min-h-screen flex flex-col w-full max-w-[100vw]">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  )
}

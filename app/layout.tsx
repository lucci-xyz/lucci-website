import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lucci Labs',
  description: 'A playground for Web3 / Crypto / DeFi R&D.',
  openGraph: {
    title: 'Lucci Labs',
    description: 'A playground for Web3 / Crypto / DeFi R&D.',
    images: ['/og.png']
  },
  icons: { icon: '/og.png' }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="text-ink antialiased bg-white">
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  )
}

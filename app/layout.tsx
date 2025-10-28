import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://luccilabs.com'),
  title: 'Lucci Labs - Blockchain R&D Collective',
  description: 'An experimental, open-source playground where innovation moves faster than perfection. Exploring the edges of Web3, DeFi, and cryptography.',
  keywords: ['blockchain', 'Web3', 'DeFi', 'cryptography', 'R&D', 'open source', 'Lucci Labs'],
  authors: [{ name: 'Lucci Labs' }],
  openGraph: {
    title: 'Lucci Labs - Blockchain R&D Collective',
    description: 'Exploring the edges of Web3, DeFi, and cryptography.',
    url: 'https://luccilabs.com',
    siteName: 'Lucci Labs',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Lucci Labs',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lucci Labs',
    description: 'Blockchain R&D Collective - Exploring Web3, DeFi, and cryptography',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-neutral-950 text-white overflow-x-hidden`}>
        {children}
      </body>
    </html>
  )
}

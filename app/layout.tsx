import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geist = Geist({ 
  subsets: ["latin"],
  variable: "--font-geist-sans"
})
const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-geist-mono"
})

export const metadata: Metadata = {
  title: "Lucci — The Economic Layer for Open Source",
  description: "Powering the next generation of builders with autonomous payouts and operations for open source developers.",
  openGraph: {
    title: "Lucci — The Economic Layer for Open Source",
    description: "Powering the next generation of builders with autonomous payouts and operations for open source developers.",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucci — The Economic Layer for Open Source",
    description: "Powering the next generation of builders with autonomous payouts and operations for open source developers.",
    images: ["/og.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}

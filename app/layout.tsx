import type React from "react"
import type { Metadata } from "next"
import { Chakra_Petch, Geist, Geist_Mono, Newsreader } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CommandPalette } from "@/components/command-palette"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
})
const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-brand",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://luccilabs.xyz"),
  title: { default: "Lucci Labs", template: "%s — Lucci Labs" },
  description: "Independent research on intelligent systems—tool-using agents, local inference, and the interfaces around them.",
  openGraph: {
    title: "Lucci Labs",
    description: "Independent research on intelligent systems—tool-using agents, local inference, and the interfaces around them.",
    type: "website",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucci Labs",
    description: "Independent research on intelligent systems—tool-using agents, local inference, and the interfaces around them.",
    images: ["/og.png"],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${newsreader.variable} ${chakraPetch.variable}`} suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('motion-ready')}}catch(e){}",
          }}
        />
        {children}
        <CommandPalette />
        <ScrollReveal />
        <Analytics />
      </body>
    </html>
  )
}

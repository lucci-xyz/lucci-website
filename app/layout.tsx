import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  metadataBase: new URL("https://lucci.tools"),
  title: { default: "Lucci Labs", template: "%s — Lucci Labs" },
  description: "Independent research, experiments, open-source projects, and useful software.",
  openGraph: {
    title: "Lucci Labs",
    description: "Independent research, experiments, open-source projects, and useful software.",
    type: "website",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucci Labs",
    description: "Independent research, experiments, open-source projects, and useful software.",
    images: ["/og.png"],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

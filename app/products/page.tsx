"use client"

import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { MagneticButton } from "@/components/magnetic-button"
import { Shader, Swirl, ChromaFlow } from "shaders/react"
import Link from "next/link"
import Image from "next/image"
import { SOCIAL_LINKS } from "@/lib/constants/social"

const productDetails = [
  {
    id: "01",
    name: "BountyPay",
    category: "Payment Infrastructure",
    link: "https://bountypay.luccilabs.xyz",
    linkText: "Try it →",
    indent: 0,
  },
  {
    id: "02",
    name: "Pilot",
    category: "AI Coordination",
    link: null,
    linkText: "Coming Soon",
    indent: 8,
  },
  {
    id: "03",
    name: "Orbit",
    category: "Crypto Autopilot",
    link: null,
    linkText: "Coming Soon",
    indent: 0,
  },
]

export default function ProductsPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      <CustomCursor />
      <GrainOverlay />

      {/* Shader Background */}
      <div className="fixed inset-0 z-0">
        <Shader className="h-full w-full">
          <Swirl
            colorA="#3d9d98"
            colorB="#5a7cbf"
            speed={0.4}
            detail={0.9}
            blend={35}
            coarseX={60}
            coarseY={60}
            mediumX={45}
            mediumY={45}
            fineX={30}
            fineY={30}
          />
          <ChromaFlow
            baseColor="#2a8a85"
            upColor="#7b68b8"
            downColor="#c9923a"
            leftColor="#5a7cbf"
            rightColor="#d4a826"
            intensity={1.0}
            radius={2.5}
            momentum={30}
            maskType="alpha"
            opacity={1}
          />
        </Shader>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Navigation */}
      <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 lg:px-20">
                <Link 
          href="/"
          className="flex items-center gap-3 transition-transform hover:scale-105"
        >
          <div className="relative h-9 w-9 overflow-hidden rounded-lg">
            <Image
              src="/og.png"
              alt="Lucci Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <span className="font-sans text-lg font-semibold tracking-tight text-white">Lucci</span>
                </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="group relative font-sans text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            Home
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link
            href="/products"
            className="group relative font-sans text-sm font-medium text-white"
          >
            Products
            <span className="absolute -bottom-1 left-0 h-px w-full bg-white" />
          </Link>
        </div>
        
        <Link href="/team">
          <MagneticButton
            variant="secondary"
            size="lg"
            className="border-none bg-white/25 text-white hover:bg-white/35"
          >
            Get in Touch
          </MagneticButton>
        </Link>
      </nav>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col px-6 pt-32 pb-16 md:px-12 md:pt-40 lg:px-20">
        {/* Hero Title */}
        <div className="mb-16 md:mb-24">
          <h1 className="mb-4 animate-in fade-in slide-in-from-bottom-8 font-sans text-6xl font-extralight tracking-tight text-white duration-1000 md:text-7xl lg:text-8xl">
            Products
          </h1>
          <p className="animate-in fade-in slide-in-from-bottom-4 font-mono text-sm tracking-wide text-white/60 duration-1000 delay-200">
            / Our explorations
          </p>
                </div>
                
        {/* Product List - Featured style with stair step */}
        <div className="flex-1">
          {productDetails.map((product, index) => (
            <div
              key={product.id}
              className="group animate-in fade-in slide-in-from-bottom-4 border-b-[0.5px] duration-700"
              style={{ 
                animationDelay: `${300 + index * 100}ms`,
                marginLeft: `${product.indent}%`,
                borderColor: 'rgba(255, 255, 255, 0.15)',
              }}
            >
              <div 
                className="flex cursor-pointer items-start justify-between py-8 transition-all duration-300 hover:py-12 md:py-10 md:hover:py-14"
                onClick={() => product.link && window.open(product.link, "_blank")}
              >
                <div className="flex items-center gap-8 md:gap-12">
                  <span className="font-mono text-xs md:text-sm text-white/40 -mt-3">
                    {product.id}
                  </span>
                  <div>
                    <h2 className="font-sans text-2xl font-light text-white transition-colors group-hover:text-white/90 md:text-3xl lg:text-4xl mb-1">
                      {product.name}
                    </h2>
                    <p className="font-mono text-[10px] tracking-wide text-white/50 md:text-xs">
                      {product.category}
                    </p>
                  </div>
                </div>
                {product.link ? (
                  <a 
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-white/60 pt-1 md:pt-2 transition-colors hover:text-accent"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {product.linkText}
                  </a>
                ) : (
                  <span className="font-mono text-xs text-white/40 pt-1 md:pt-2">
                    {product.linkText}
                  </span>
                )}
              </div>
            </div>
          ))}
      </div>

        {/* Footer */}
        <footer className="mt-20 border-t border-white/30 pt-8 md:mt-32">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="font-mono text-xs text-white/30">
              © {new Date().getFullYear()} Lucci. The economic layer for open source.
            </p>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-white/30 transition-colors hover:text-accent"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}

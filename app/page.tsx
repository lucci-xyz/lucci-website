"use client"

import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { ProductsSection } from "@/components/sections/products-section"
import { CapabilitiesSection } from "@/components/sections/capabilities-section"
import { ContactSection } from "@/components/sections/contact-section"
import { MagneticButton } from "@/components/magnetic-button"
import { useRef, useEffect, useState } from "react"
import Image from "next/image"

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const touchStartY = useRef(0)
  const touchStartX = useRef(0)
  const shaderContainerRef = useRef<HTMLDivElement>(null)
  const scrollThrottleRef = useRef<number | null>(null)

  useEffect(() => {
    const checkShaderReady = () => {
      if (shaderContainerRef.current) {
        const canvas = shaderContainerRef.current.querySelector("canvas")
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsLoaded(true)
          return true
        }
      }
      return false
    }

    if (checkShaderReady()) return

    const intervalId = setInterval(() => {
      if (checkShaderReady()) {
        clearInterval(intervalId)
      }
    }, 100)

    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 1500)

    return () => {
      clearInterval(intervalId)
      clearTimeout(fallbackTimer)
    }
  }, [])

  const scrollToSection = (index: number) => {
    if (scrollContainerRef.current) {
      const sectionWidth = scrollContainerRef.current.offsetWidth
      scrollContainerRef.current.scrollTo({
        left: sectionWidth * index,
        behavior: "smooth",
      })
      setCurrentSection(index)
    }
  }

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
      touchStartX.current = e.touches[0].clientX
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (Math.abs(e.touches[0].clientY - touchStartY.current) > 10) {
        e.preventDefault()
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY
      const touchEndX = e.changedTouches[0].clientX
      const deltaY = touchStartY.current - touchEndY
      const deltaX = touchStartX.current - touchEndX

      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
        if (deltaY > 0 && currentSection < 4) {
          scrollToSection(currentSection + 1)
        } else if (deltaY < 0 && currentSection > 0) {
          scrollToSection(currentSection - 1)
        }
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("touchstart", handleTouchStart, { passive: true })
      container.addEventListener("touchmove", handleTouchMove, { passive: false })
      container.addEventListener("touchend", handleTouchEnd, { passive: true })
    }

    return () => {
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart)
        container.removeEventListener("touchmove", handleTouchMove)
        container.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [currentSection])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()

        if (!scrollContainerRef.current) return

        scrollContainerRef.current.scrollBy({
          left: e.deltaY,
          behavior: "instant",
        })

        const sectionWidth = scrollContainerRef.current.offsetWidth
        const newSection = Math.round(scrollContainerRef.current.scrollLeft / sectionWidth)
        if (newSection !== currentSection) {
          setCurrentSection(newSection)
        }
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false })
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel)
      }
    }
  }, [currentSection])

  useEffect(() => {
    const handleScroll = () => {
      if (scrollThrottleRef.current) return

      scrollThrottleRef.current = requestAnimationFrame(() => {
        if (!scrollContainerRef.current) {
          scrollThrottleRef.current = null
          return
        }

        const sectionWidth = scrollContainerRef.current.offsetWidth
        const scrollLeft = scrollContainerRef.current.scrollLeft
        const newSection = Math.round(scrollLeft / sectionWidth)

        if (newSection !== currentSection && newSection >= 0 && newSection <= 4) {
          setCurrentSection(newSection)
        }

        scrollThrottleRef.current = null
      })
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true })
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll)
      }
      if (scrollThrottleRef.current) {
        cancelAnimationFrame(scrollThrottleRef.current)
        scrollThrottleRef.current = null
      }
    }
  }, [currentSection])

  const navItems = ["Home", "Products", "Capabilities", /* "Team", */ "Contact"]

  return (
    <main className="relative h-screen w-full overflow-hidden bg-background">
      <CustomCursor />
      <GrainOverlay />

      {/* Dynamic shader background with color variety - teal, blue, purple, gold */}
      <div
        ref={shaderContainerRef}
        className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ contain: "strict" }}
      >
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
        {/* Light overlay for text contrast */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Navigation */}
      <nav
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-4 py-4 transition-opacity duration-700 md:px-8 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={() => scrollToSection(0)}
          className="flex items-center gap-2 transition-transform hover:scale-105"
        >
          <div className="relative h-8 w-8 overflow-hidden rounded-full transition-all duration-300 hover:scale-110">
            <Image
              src="/og.png"
              alt="Lucci Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <span className="font-sans text-base font-semibold tracking-tight text-white">Lucci</span>
        </button>

        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item, index) => (
            <button
              key={item}
              onClick={() => scrollToSection(index)}
              className={`group relative font-sans text-xs font-medium transition-colors ${
                currentSection === index ? "text-white" : "text-white/70 hover:text-white"
              }`}
            >
              {item}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-white transition-all duration-300 ${
                  currentSection === index ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          ))}
        </div>

        <MagneticButton
          variant="secondary"
          className="border-none bg-white/25 text-white hover:bg-white/35"
          onClick={() => scrollToSection(4)}
        >
          Get in Touch
        </MagneticButton>
      </nav>

      {/* Content */}
      <div
        ref={scrollContainerRef}
        data-scroll-container
        className={`relative z-10 flex h-screen overflow-x-auto overflow-y-hidden transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Hero Section */}
        <section className="flex min-h-screen w-screen shrink-0 flex-col justify-center px-6 py-20 md:px-12 lg:px-20">
          <div className="max-w-4xl">
            <div className="mb-4 inline-block animate-in fade-in slide-in-from-bottom-4 rounded-full bg-white/25 px-4 py-1.5 backdrop-blur-md duration-700">
              <p className="font-mono text-xs text-white/80">The Economic Layer for Open Source</p>
            </div>
            <h1 className="mb-6 animate-in fade-in slide-in-from-bottom-8 font-sans text-4xl font-light leading-[1.1] tracking-tight text-white duration-1000 md:text-5xl lg:text-6xl xl:text-7xl">
              <span className="text-balance">
                Powering the Next
                <br />
                Generation of
                <br />
                <span className="text-white">Builders</span>
              </span>
            </h1>
            <p className="mb-8 max-w-2xl animate-in fade-in slide-in-from-bottom-4 text-base leading-relaxed text-white/80 duration-1000 delay-200 md:text-lg">
              Autonomous payouts and operations for open source developers. 
              Pay contributors in stablecoins and automate coordination with AI.
            </p>
            <div className="flex animate-in fade-in slide-in-from-bottom-4 flex-col gap-4 duration-1000 delay-300 sm:flex-row sm:items-center">
              <MagneticButton
                size="lg"
                variant="primary"
                onClick={() => scrollToSection(1)}
              >
                Explore Products
              </MagneticButton>
              {/* <MagneticButton size="lg" variant="secondary" onClick={() => scrollToSection(3)}>
                Meet the Team
              </MagneticButton> */}
            </div>
          </div>

        </section>

        {/* Scroll indicator - fixed at bottom center */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20 animate-in fade-in duration-1000 delay-500">
          <div className="flex items-center gap-2">
            <p className="font-mono text-[10px] text-white/60">Scroll to explore</p>
            <div className="flex h-5 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            </div>
          </div>
        </div>

        <ProductsSection scrollToSection={scrollToSection} />
        <CapabilitiesSection />
        {/* <TeamSection scrollToSection={scrollToSection} /> */}
        <ContactSection />
      </div>
    </main>
  )
}

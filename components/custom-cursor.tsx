"use client"

import { useEffect, useRef, useState } from "react"

export function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const positionRef = useRef({ x: 0, y: 0 })
  const targetPositionRef = useRef({ x: 0, y: 0 })
  const isPointerRef = useRef(false)
  const [isTouchDevice, setIsTouchDevice] = useState(true) // Default to true to avoid flash on mobile

  useEffect(() => {
    // Check if device supports touch or has no fine pointer (mouse)
    const checkTouchDevice = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches
      const hasNoFinePointer = !window.matchMedia('(pointer: fine)').matches
      return hasTouch && (hasCoarsePointer || hasNoFinePointer)
    }
    
    setIsTouchDevice(checkTouchDevice())
  }, [])

  useEffect(() => {
    if (isTouchDevice) return // Don't set up cursor tracking on touch devices

    let animationFrameId: number

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    const updateCursor = () => {
      positionRef.current.x = lerp(positionRef.current.x, targetPositionRef.current.x, 0.15)
      positionRef.current.y = lerp(positionRef.current.y, targetPositionRef.current.y, 0.15)

      if (outerRef.current && innerRef.current) {
        const scale = isPointerRef.current ? 1.5 : 1
        const innerScale = isPointerRef.current ? 0.5 : 1

        outerRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-50%, -50%) scale(${scale})`
        innerRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-50%, -50%) scale(${innerScale})`
      }

      animationFrameId = requestAnimationFrame(updateCursor)
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetPositionRef.current = { x: e.clientX, y: e.clientY }

      const target = e.target as HTMLElement
      isPointerRef.current =
        window.getComputedStyle(target).cursor === "pointer" || target.tagName === "BUTTON" || target.tagName === "A"
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    animationFrameId = requestAnimationFrame(updateCursor)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isTouchDevice])

  // Don't render cursor on touch devices
  if (isTouchDevice) return null

  return (
    <>
      <div
        ref={outerRef}
        className="pointer-events-none fixed left-0 top-0 z-50 mix-blend-difference will-change-transform"
        style={{ contain: "layout style paint" }}
      >
        <div className="h-6 w-6 rounded-full border-2 border-white opacity-80" />
      </div>
      <div
        ref={innerRef}
        className="pointer-events-none fixed left-0 top-0 z-50 mix-blend-difference will-change-transform"
        style={{ contain: "layout style paint" }}
      >
        <div className="h-2.5 w-2.5 rounded-full bg-white" />
      </div>
    </>
  )
}

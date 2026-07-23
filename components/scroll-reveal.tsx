"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

// Elements that fade into place. Kept in sync with the reveal rules in globals.css.
const SELECTOR = [
  ".hero",
  ".home-intro",
  ".section-head",
  ".page-hero",
  ".index-entry",
  ".docs-content section",
  ".post-heading",
  "article.content",
].join(",")

export function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    const root = document.documentElement
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (reduced) {
      root.classList.remove("motion-ready")
      return
    }

    root.classList.add("motion-ready")

    const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR))

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 },
    )

    els.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [pathname])

  return null
}

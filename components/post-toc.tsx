"use client"

import { useEffect, useState } from "react"

type TocItem = { id: string; label: string }

export function PostToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)

    // The section whose top most recently crossed the upper part of the viewport wins.
    function update() {
      let current: string | null = null
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= window.innerHeight * 0.3) current = section.id
      }
      setActive(current)
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [items])

  return (
    <nav className="left-toc" aria-label="Table of contents">
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} aria-current={active === item.id ? "location" : undefined}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

"use client"

import { useEffect, useState } from "react"

type TocItem = { id: string; label: string; num?: string }

export function ArticleToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "")

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: "-12% 0px -72% 0px", threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [items])

  return (
    <nav className="doc-toc" aria-label="On this page">
      <p>On this page</p>
      <ol>
        {items.map((item) => (
          <li key={item.id} className={active === item.id ? "is-active" : undefined}>
            <a href={`#${item.id}`} aria-current={active === item.id ? "true" : undefined}>
              <span>{item.num ?? ""}</span>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

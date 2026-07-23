"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  { href: "/research", label: "Research" },
  { href: "/projects", label: "Projects" },
  { href: "/docs", label: "Docs" },
]

export function SiteHeader() {
  const pathname = usePathname()
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Lucci Labs home">Lucci Labs</Link>
      <nav className="site-nav" aria-label="Main navigation">
        {links.map((link) => (
          <Link key={link.href} href={link.href} aria-current={pathname.startsWith(link.href) ? "page" : undefined}>
            {link.label}
          </Link>
        ))}
        <a className="external" href="https://github.com/lucci-xyz" target="_blank" rel="noreferrer">GitHub ↗</a>
        <button
          className="kbd-chip"
          type="button"
          aria-label="Open command menu"
          onClick={() => window.dispatchEvent(new Event("lucci:cmdk"))}
        >
          ⌘K
        </button>
      </nav>
    </header>
  )
}

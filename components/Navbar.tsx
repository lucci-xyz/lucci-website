'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Container from './Container'

const links = [
  { href: '/products', label: 'Products' },
  { href: '/docs', label: 'Explore' },
  { href: '/team', label: 'Team' }
]

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-black/5">
      <Container>
        <nav className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.svg" alt="Lucci" className="h-5" />
            <img src="/og.png" alt="Lucci" className="h-8 w-8 rounded-md" />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 text-sm">
            {links.map((l) => (
              <Link key={l.href} href={l.href as any} className={`transition ${pathname === l.href ? 'text-ink' : 'text-ink/70 hover:text-ink'}`}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger Menu Button */}
          <button
            className="md:hidden flex flex-col gap-1.5 w-6 h-6 items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className={`w-6 h-0.5 bg-ink transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-ink transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </nav>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-black/5">
            <div className="flex flex-col gap-4 text-sm">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href as any}
                  className={`transition ${pathname === l.href ? 'text-ink' : 'text-ink/70 hover:text-ink'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}

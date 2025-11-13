'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Container from './Container'
import { MAIN_NAV_LINKS } from '@/lib/constants/navigation'
import { COLORS } from '@/lib/constants/theme'
import type { NavbarProps } from '@/lib/types'

export default function Navbar({ aboutUsTextColor }: NavbarProps) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  // Default to mint green text, but use white for non-homepage
  const buttonTextColor = aboutUsTextColor || (pathname === '/' ? COLORS.backgroundMint : COLORS.white)

  return (
    <div className="z-50 bg-transparent animate-fade-in-up w-full max-w-[100vw]">
      <Container>
        <nav className="flex h-20 items-center justify-between w-full">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-normal" style={{ color: COLORS.primary }}>Lucci</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {MAIN_NAV_LINKS.map((link) => (
              <Link 
                key={link.href} 
                href={link.href as any} 
                className="text-base font-normal transition capitalize"
                style={{ color: COLORS.primary }}
              >
                {link.label}
              </Link>
            ))}
            <Link 
              href="/team" 
              className="rounded-full px-4 py-2.5 text-sm font-normal transition-all hover:opacity-90 capitalize"
              style={{ backgroundColor: COLORS.primary, color: buttonTextColor }}
            >
              About Us
            </Link>
          </div>

          {/* Mobile Hamburger Menu Button */}
          <button
            className="md:hidden flex flex-col gap-1.5 w-6 h-6 items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className={`w-6 h-0.5 transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} style={{ backgroundColor: COLORS.primary }} />
            <span className={`w-6 h-0.5 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ backgroundColor: COLORS.primary }} />
          </button>
        </nav>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t w-full max-w-[100vw]" style={{ borderColor: `${COLORS.primary}1A` }}>
            <div className="flex flex-col gap-4 text-sm w-full">
              {MAIN_NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href as any}
                  className="transition font-normal capitalize"
                  style={{ color: COLORS.primary }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                href="/team" 
                className="transition font-normal capitalize"
                style={{ color: COLORS.primary }}
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}

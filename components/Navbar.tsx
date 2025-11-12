'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Container from './Container'

const links = [
  { href: '/products', label: 'Products' }
]

interface NavbarProps {
  aboutUsTextColor?: string
}

export default function Navbar({ aboutUsTextColor }: NavbarProps) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  // Default to mint green text, but use white for non-homepage
  const buttonTextColor = aboutUsTextColor || (pathname === '/' ? '#83EEE8' : 'white')

  return (
    <div className="z-50 bg-transparent animate-fade-in-up">
      <Container>
        <nav className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-normal" style={{ color: '#00827B' }}>Lucci</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <Link 
                key={l.href} 
                href={l.href as any} 
                className="text-base font-normal transition capitalize"
                style={{ color: '#00827B' }}
              >
                {l.label}
              </Link>
            ))}
            <Link 
              href="/team" 
              className="rounded-full px-4 py-2.5 text-sm font-normal transition-all hover:opacity-90 capitalize"
              style={{ backgroundColor: '#00827B', color: buttonTextColor }}
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
            <span className={`w-6 h-0.5 transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} style={{ backgroundColor: '#00827B' }} />
            <span className={`w-6 h-0.5 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ backgroundColor: '#00827B' }} />
          </button>
        </nav>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t" style={{ borderColor: 'rgba(0, 130, 123, 0.1)' }}>
            <div className="flex flex-col gap-4 text-sm">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href as any}
                  className="transition font-normal capitalize"
                  style={{ color: '#00827B' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
              <Link 
                href="/team" 
                className="transition font-normal capitalize"
                style={{ color: '#00827B' }}
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

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Github, Twitter, FileText, Beaker } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Research', href: '#research' },
  { name: 'Projects', href: '#projects' },
  { name: 'About', href: '#about' },
  { name: 'Blog', href: '#blog' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'glass-effect border-b border-neutral-200' : 'bg-white/80 backdrop-blur-xl'
      )}
    >
      <nav className="container-width section-padding py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-200 blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
              <div className="relative w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
            </div>
            <span className="text-xl font-semibold">Lucci Labs</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="https://github.com/luccilabs"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link
              href="https://twitter.com/luccilabs"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </Link>
            <Link
              href="/docs"
              className="px-4 py-2 glass-effect rounded-lg text-sm font-medium glass-effect-hover"
            >
              Documentation
            </Link>
            <Link
              href="/app"
              className="px-4 py-2 bg-gradient-primary rounded-lg text-sm font-medium text-white hover:opacity-90 transition-all duration-200"
            >
              Launch App
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-neutral-600 hover:text-neutral-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-6 py-6 border-t border-neutral-200">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-neutral-600 hover:text-neutral-900 transition-colors duration-200 text-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-neutral-200 flex space-x-4">
                <Link
                  href="https://github.com/luccilabs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </Link>
                <Link
                  href="https://twitter.com/luccilabs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </Link>
              </div>
              <div className="flex flex-col space-y-3 pt-4">
                <Link
                  href="/docs"
                  className="px-4 py-2 glass-effect rounded-lg text-sm font-medium text-center glass-effect-hover"
                >
                  Documentation
                </Link>
                <Link
                  href="/app"
                  className="px-4 py-2 bg-gradient-primary rounded-lg text-sm font-medium text-center text-white hover:opacity-90 transition-all duration-200"
                >
                  Launch App
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

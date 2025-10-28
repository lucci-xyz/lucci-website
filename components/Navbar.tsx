'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Container from './Container'

const links = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/docs', label: 'Docs' },
  { href: 'https://github.com/LucciCapital', label: 'GitHub', external: true }
]

export default function Navbar() {
  const pathname = usePathname()
  return (
    <div className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-black/5">
      <Container>
        <nav className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.svg" alt="Lucci" className="h-5" />
          </Link>
          <div className="flex items-center gap-6 text-sm">
            {links.map((l) =>
              l.external ? (
                <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="text-ink/70 hover:text-ink transition">
                  {l.label}
                </a>
              ) : (
                <Link key={l.href} href={l.href as any} className={`transition ${pathname === l.href ? 'text-ink' : 'text-ink/70 hover:text-ink'}`}>
                  {l.label}
                </Link>
              )
            )}
          </div>
        </nav>
      </Container>
    </div>
  )
}

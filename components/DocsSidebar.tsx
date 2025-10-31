'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface DocLink {
  label: string
  href: string
}

interface DocSection {
  title: string
  links: DocLink[]
}

const docSections: DocSection[] = [
  {
    title: 'Getting Started',
    links: [
      { label: 'Overview', href: '/docs' },
      { label: 'Quick Start', href: '/docs/quick-start' }
    ]
  },
  {
    title: 'Products',
    links: [
      { label: 'BountyPay', href: '/docs/products/bountypay' },
      { label: 'Good First Issues', href: '/docs/products/good-first-issues' },
      { label: 'Flash Loans', href: '/docs/products/flash' },
      { label: 'Chain Trace', href: '/docs/products/chain-trace' }
    ]
  },
  {
    title: 'Reference',
    links: [
      { label: 'Contributing', href: '/docs/reference/contributing' },
      { label: 'Support', href: '/docs/reference/support' }
    ]
  }
]

export default function DocsSidebar() {
  const pathname = usePathname()
  
  return (
    <aside className="w-full lg:w-64 lg:flex-shrink-0 lg:pr-8 lg:border-r border-black/5">
      <div className="lg:sticky lg:top-20 space-y-6">
        {docSections.map((section) => (
          <div key={section.title}>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink/50 mb-3">
              {section.title}
            </h3>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href as any}
                    className={`block text-sm transition-colors ${
                      pathname === link.href
                        ? 'text-primary font-medium'
                        : 'text-ink/70 hover:text-ink'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  )
}

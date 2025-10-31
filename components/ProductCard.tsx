'use client'

import Link from 'next/link'

type LinkType = {
  label: string
  url: string
}

type Props = {
  name: string
  blurb: string
  tags: string[]
  status: string
  href?: string
  links?: LinkType[]
}

export default function ProductCard({ name, blurb, tags, status, href, links }: Props) {
  const content = (
    <div className="group rounded-2xl border border-black/5 p-6 hover:-translate-y-0.5 transition-transform bg-white/70">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-ink">{name}</h3>
        <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary/80 border border-primary/20">{status}</span>
      </div>
      <p className="mt-2 text-sm text-ink/70">{blurb}</p>
      {links && links.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.url as any}
              target="_blank"
              rel="noreferrer"
              className="text-xs px-2.5 py-1 rounded-full bg-ink/5 hover:bg-ink/10 text-ink/80 hover:text-ink transition-colors border border-black/10"
              onClick={(e) => e.stopPropagation()}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((t) => (
          <span key={t} className="text-xs px-2 py-1 rounded-full border border-black/10 text-ink/70">{t}</span>
        ))}
      </div>
    </div>
  )

  if (href) {
    return (
      <Link href={href as any} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
        {content}
      </Link>
    )
  }

  return content
}

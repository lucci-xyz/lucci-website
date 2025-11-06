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
    <div className="group relative rounded-2xl border border-black/5 p-8 hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-white via-white to-primary/5 hover:shadow-xl hover:shadow-primary/10 overflow-hidden">
      {/* Gradient accent on hover */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-400 to-pink-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-ink group-hover:text-primary transition-colors">{name}</h3>
        <span className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-purple-400/10 text-primary font-semibold border border-primary/20 shadow-sm">
          {status}
        </span>
      </div>
      
      <p className="text-base text-ink/70 leading-relaxed mb-6">{blurb}</p>
      
      {links && links.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-6">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.url as any}
              target="_blank"
              rel="noreferrer"
              className="text-sm px-4 py-2 rounded-xl bg-gradient-to-r from-primary/10 to-purple-400/10 hover:from-primary/20 hover:to-purple-400/20 text-ink font-medium transition-all border border-primary/20 hover:border-primary/40 hover:shadow-md"
              onClick={(e) => e.stopPropagation()}
            >
              {link.label} →
            </Link>
          ))}
        </div>
      )}
      
      <div className="flex flex-wrap gap-2">
        {tags.map((t, idx) => (
          <span 
            key={t} 
            className="text-xs px-3 py-1.5 rounded-lg border border-black/10 text-ink/70 bg-white/50 hover:bg-primary/5 hover:border-primary/20 transition-colors"
            style={{
              animationDelay: `${idx * 50}ms`
            }}
          >
            {t}
          </span>
        ))}
      </div>
      
      {/* Corner decoration */}
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent via-primary/5 to-purple-400/10 rounded-tl-full transform translate-x-16 translate-y-16 group-hover:translate-x-8 group-hover:translate-y-8 transition-transform duration-500" />
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

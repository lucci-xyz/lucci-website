import type React from "react"
import type { MDXComponents } from "next-mdx-remote/rsc"
import { slugifyHeading } from "@/lib/writing"

function textOf(children: React.ReactNode): string {
  if (typeof children === "string") return children
  if (typeof children === "number") return String(children)
  if (Array.isArray(children)) return children.map(textOf).join("")
  if (children && typeof children === "object" && "props" in children) {
    return textOf((children as React.ReactElement<{ children?: React.ReactNode }>).props.children)
  }
  return ""
}

// Tufte-style margin note: hidden on mobile until its number is tapped.
export function Sidenote({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <>
      <label htmlFor={id} className="sidenote-number" aria-hidden="true" />
      <input type="checkbox" id={id} className="margin-toggle" />
      <span className="sidenote">{children}</span>
    </>
  )
}

// Figure with a small centered caption. Wrap an image, diagram, or component.
export function Figure({ caption, children }: { caption?: string; children: React.ReactNode }) {
  return (
    <figure>
      {children}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

// Labeled rows with hairlines — used for layered/lifecycle diagrams.
export function ManifestDiagram({
  label,
  rows,
}: {
  label?: string
  rows: Array<{ name: string; tag: string; desc: string }>
}) {
  return (
    <div className="manifest-diagram" role="img" aria-label={label}>
      {rows.map((row) => (
        <div key={row.name}>
          <strong>{row.name}</strong>
          <span>{row.tag}</span>
          <p>{row.desc}</p>
        </div>
      ))}
    </div>
  )
}

export const mdxComponents: MDXComponents = {
  h2: ({ children }) => <h2 id={slugifyHeading(textOf(children))}>{children}</h2>,
  Sidenote,
  Figure,
  ManifestDiagram,
}

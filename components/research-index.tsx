"use client"

import Link from "next/link"
import { useState } from "react"
import type { ResearchItem } from "@/lib/site-data"

type Filter = "all" | ResearchItem["category"]

export function ResearchIndex({ items }: { items: ResearchItem[] }) {
  const [filter, setFilter] = useState<Filter>("all")
  const filtered = items.filter((item) => filter === "all" || item.category === filter)

  return (
    <>
      <div className="filter-bar" aria-label="Research filters">
        <div className="filters">
          {(["all", "research", "systems", "design"] as Filter[]).map((value) => (
            <button
              className={`filter${filter === value ? " active" : ""}`}
              key={value}
              type="button"
              onClick={() => setFilter(value)}
            >
              {value}
            </button>
          ))}
        </div>
        <span className="section-index">Newest first</span>
      </div>

      <section className="index-list" aria-label="Research index">
        {filtered.map((item) => {
          const content = (
            <>
              <p className="index-date">{item.date}<br />{item.format}</p>
              <h2 className="index-title">{item.title}</h2>
              <p className="index-desc">{item.description}</p>
              <span className="arrow" aria-hidden="true">{item.slug ? "↗" : "—"}</span>
            </>
          )

          return item.slug ? (
            <Link className="index-entry" href={`/research/${item.slug}`} key={item.title}>{content}</Link>
          ) : (
            <article className="index-entry is-forthcoming" key={item.title}>{content}</article>
          )
        })}
      </section>
    </>
  )
}

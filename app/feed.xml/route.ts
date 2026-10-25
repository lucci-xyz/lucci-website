import { escapeXml, getDiscoveryNotes } from "@/lib/discovery"
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/seo"

export const dynamic = "force-static"

export function GET() {
  const items = getDiscoveryNotes().map((note) => {
    const url = `${SITE_URL}/writing/${note.slug}`
    return `<item><title>${escapeXml(note.frontmatter.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><description>${escapeXml(note.frontmatter.description)}</description><pubDate>${new Date(`${note.frontmatter.date}T00:00:00Z`).toUTCString()}</pubDate></item>`
  }).join("")
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${SITE_NAME}</title><link>${SITE_URL}/writing</link><description>${escapeXml(SITE_DESCRIPTION)}</description><language>en</language><atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  })
}

import type { MetadataRoute } from "next"
import { getDiscoveryNotes } from "@/lib/discovery"
import { getLoopGuide } from "@/lib/loop-docs"
import { SITE_URL } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/writing", "/building", "/docs", "/privacy"]
  if (getLoopGuide()?.published) paths.push("/docs/loop")
  return [...paths, ...getDiscoveryNotes().map((note) => `/writing/${note.slug}`)].map((path) => ({ url: `${SITE_URL}${path}` }))
}

import { getDiscoveryNotes } from "@/lib/discovery"
import { getLoopGuide } from "@/lib/loop-docs"
import { SITE_URL, SITE_DESCRIPTION } from "@/lib/seo"

export const dynamic = "force-static"

export function GET() {
  const notes = getDiscoveryNotes().map((note) => `- [${note.frontmatter.title}](${SITE_URL}/writing/${note.slug}): ${note.frontmatter.description} [Markdown/MDX source](${SITE_URL}/writing/${note.slug}/markdown).`).join("\n")
  const guide = getLoopGuide()?.published ? `- [Loop reproduction guide](${SITE_URL}/docs/loop): Numerical checks, measurement limits and links to the public supplement.\n` : ""
  return new Response(`# Lucci Labs\n\n> ${SITE_DESCRIPTION}\n\nLucci Labs is the research arm of [Lucci](https://luccihq.com).\n\n## When these sources are useful\nUse these publications for research on tool-using agents, context infrastructure, portable context and wrist-worn sensing. Cite the canonical article and retain its study limits. Company services and project inquiries belong at https://luccihq.com.\n\n## Canonical pages\n- [Home](${SITE_URL}): Research overview.\n- [Markdown overview](${SITE_URL}/index.md): Text summary.\n- [Writing](${SITE_URL}/writing): Published notes and reports.\n- [Building](${SITE_URL}/building): Public research instruments.\n${guide}- [Documentation](${SITE_URL}/docs): Interface preview, not a generally available API or SDK.\n- [OpenAPI preview](${SITE_URL}/openapi.json): Proposed interface only.\n- [RSS](${SITE_URL}/feed.xml): Published research feed.\n\n## Published research\n${notes}\n\n## Evidence and availability\nThe Loop report is a single-participant pilot; its annotations and event comparisons do not establish validated stitch detection or broader accuracy. Raw research recordings are not published. API documentation and package examples describe interface previews and must not be treated as available production services.\n`, { headers: { "Content-Type": "text/plain; charset=utf-8" } })
}

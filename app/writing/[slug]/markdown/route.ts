import { getDiscoveryNotes } from "@/lib/discovery"
import { SITE_URL } from "@/lib/seo"

export const dynamic = "force-static"
export const dynamicParams = false
export function generateStaticParams() { return getDiscoveryNotes().map(({ slug }) => ({ slug })) }

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const note = getDiscoveryNotes().find((item) => item.slug === slug)
  if (!note) return new Response(`# Not found\n\nSee [published research](${SITE_URL}/writing).\n`, { status: 404, headers: { "Content-Type": "text/markdown; charset=utf-8" } })
  const canonical = `${SITE_URL}/writing/${slug}`
  return new Response(`# ${note.frontmatter.title}\n\n${note.frontmatter.description}\n\nCanonical HTML page: ${canonical}\nAuthor: ${note.frontmatter.author ?? "Lucci Labs"}\nPublished: ${note.frontmatter.date}\nFormat: ${note.frontmatter.format}\n\nThe body below is the published Markdown/MDX source; visual components are rendered on the canonical HTML page.\n\n${note.content}`, {
    headers: { "Content-Type": "text/markdown; charset=utf-8", "Link": `<${canonical}>; rel="canonical"`, "X-Robots-Tag": "noindex" },
  })
}

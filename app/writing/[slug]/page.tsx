import type { Metadata } from "next"
import { JsonLd } from "@/components/json-ld"
import { pageMetadata, SITE_URL } from "@/lib/seo"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { PostToc } from "@/components/post-toc"
import { mdxComponents } from "@/components/mdx"
import { extractHeadings, formatFullDate, formatMonthYear, getNote, getPublishedNotes } from "@/lib/writing"
import "../article.css"

export const dynamicParams = false

export function generateStaticParams() {
  return getPublishedNotes().map((note) => ({ slug: note.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const note = getNote(slug)
  if (!note) return {}
  const base = pageMetadata(`/writing/${slug}`, note.frontmatter.title, note.frontmatter.description)
  return {
    ...base,
    openGraph: { ...base.openGraph, type: "article", publishedTime: note.frontmatter.date, authors: [note.frontmatter.author ?? "Lucci Labs"] },
    other: { citation_title: note.frontmatter.title, citation_author: note.frontmatter.author ?? "Lucci Labs", citation_publication_date: note.frontmatter.date.replaceAll("-", "/"), citation_publisher: "Lucci Labs" },
  }
}

export default async function WritingNotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const note = getNote(slug)
  if (!note) notFound()

  const headings = extractHeadings(note.content)

  return (
    <div className="shell article-shell" id="top">
      <SiteHeader />
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "Article",
        "@id": `${SITE_URL}/writing/${slug}#article`, url: `${SITE_URL}/writing/${slug}`,
        mainEntityOfPage: `${SITE_URL}/writing/${slug}`, headline: note.frontmatter.title,
        description: note.frontmatter.description, datePublished: note.frontmatter.date,
        image: `${SITE_URL}/og.png`, inLanguage: "en",
        author: note.frontmatter.author === "Lucci Labs" || !note.frontmatter.author
          ? { "@id": `${SITE_URL}/#organization` }
          : { "@type": "Person", name: note.frontmatter.author },
        publisher: { "@id": `${SITE_URL}/#organization` },
        isPartOf: { "@id": `${SITE_URL}/#website` },
      }} />
      <main className="post">
        <div className="post-heading">
          <h1 className="post-title">{note.frontmatter.title}</h1>
          <div className="publish-metadata">
            <span className="author">{note.frontmatter.author ?? "Lucci Labs"}</span>
            <span>{formatFullDate(note.frontmatter.date)}</span>
          </div>
        </div>

        <div className="post-content-shell">
          <PostToc items={headings} />
          <article className="content">
            {/* Our own repo's content is trusted: allow JSX expression props (component rows, etc.) */}
            <MDXRemote
              source={note.content}
              components={mdxComponents}
              options={{ blockJS: false, mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />

            <footer className="document-notes">
              <section>
                <h2>Citation</h2>
                <p>
                  {note.frontmatter.author ?? "Lucci Labs"}. &ldquo;{note.frontmatter.title}.&rdquo; {note.frontmatter.format},{" "}
                  {formatMonthYear(note.frontmatter.date)}.
                </p>
              </section>
              <section>
                <h2>Related</h2>
                <p><a href={`/writing/${slug}/markdown`}>Read the Markdown/MDX source</a></p>
                <p><Link href="/docs">Developer documentation</Link></p>
                <p><Link href="/building">Open-source projects</Link></p>
              </section>
            </footer>
          </article>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

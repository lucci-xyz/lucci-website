import type { Metadata } from "next"
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
  return { title: note.frontmatter.title, description: note.frontmatter.description }
}

export default async function WritingNotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const note = getNote(slug)
  if (!note) notFound()

  const headings = extractHeadings(note.content)

  return (
    <div className="shell article-shell" id="top">
      <SiteHeader />
      <main className="post">
        <div className="post-heading">
          <h1 className="post-title">{note.frontmatter.title}</h1>
          <div className="publish-metadata">
            <span className="author">Lucci Labs</span>
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
                  Lucci Labs. &ldquo;{note.frontmatter.title}.&rdquo; {note.frontmatter.format},{" "}
                  {formatMonthYear(note.frontmatter.date)}.
                </p>
              </section>
              <section>
                <h2>Related</h2>
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

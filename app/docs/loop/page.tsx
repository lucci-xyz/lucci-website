import type { Metadata } from "next"
import { pageMetadata } from "@/lib/seo"
import type { ReactElement, ReactNode } from "react"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import { CodeCard, DocsQuickstart } from "@/components/docs-quickstart"
import { mdxComponents } from "@/components/mdx"
import { getLoopGuide } from "@/lib/loop-docs"
import { extractHeadings } from "@/lib/writing"

export function generateMetadata(): Metadata {
  const guide = getLoopGuide()
  return guide ? { ...pageMetadata("/docs/loop", guide.title, guide.description), robots: guide.published ? undefined : { index: false, follow: false } } : {}
}

export default function LoopGuidePage() {
  const guide = getLoopGuide()
  if (!guide) notFound()
  const headings = extractHeadings(guide.content)
  const components = {
    ...mdxComponents,
    table: ({ children }: { children?: ReactNode }) => <div className="docs-table-scroll" role="region" aria-label="Research data table" tabIndex={0}><table>{children}</table></div>,
    pre: ({ children }: { children?: ReactElement<{ children?: string }> }) =>
      <CodeCard files={[{ name: "Terminal", lang: "sh", code: String(children?.props.children ?? "").trimEnd() }]} />,
  }
  return (
    <DocsQuickstart page="loop" headings={headings} showLoopGuide>
      <p className="breadcrumbs">Docs / Research tools / Loop</p>
      <h1>{guide.title}</h1>
      <p className="docs-lead">{guide.description}</p>
      <div className="doc-tools"><a href="/writing/loop-wp-01-measuring-fine-grained-manual-activity">Read the report</a><a href="#resources-and-access">Code and data access</a></div>
      {!guide.published && <div className="docs-notice"><strong>Private review preview.</strong> The report and this guide remain unpublished. The numerical tables and analysis code are public on Hugging Face.</div>}
      <div className="loop-guide"><MDXRemote source={guide.content} components={components} options={{ blockJS: false, mdxOptions: { remarkPlugins: [remarkGfm] } }} /></div>
    </DocsQuickstart>
  )
}

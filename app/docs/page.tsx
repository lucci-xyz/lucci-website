import { pageMetadata } from "@/lib/seo"
import { DocsQuickstart } from "@/components/docs-quickstart"
import { getLoopGuide } from "@/lib/loop-docs"

export const metadata = pageMetadata("/docs", "Developer documentation & interface previews", "Developer documentation and API interface previews from Lucci Labs. For reproducible Loop research, use the published numerical analysis guide.")

export default function DocsPage() {
  return <DocsQuickstart showLoopGuide={Boolean(getLoopGuide())} />
}

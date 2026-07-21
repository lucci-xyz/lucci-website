import type { Metadata } from "next"
import { DocsQuickstart } from "@/components/docs-quickstart"

export const metadata: Metadata = {
  title: "Docs",
  description: "Developer documentation and API interface previews from Lucci Labs.",
}

export default function DocsPage() {
  return <DocsQuickstart />
}

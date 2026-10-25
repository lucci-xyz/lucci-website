import { getPublishedNotes } from "@/lib/writing"

// Discovery never opts a note into publication. Missing flags fail closed.
export function getDiscoveryNotes() {
  return getPublishedNotes().filter((note) => note.frontmatter.published === true)
}

export function escapeXml(value: string) {
  return value.replace(/[<>&"']/g, (character) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" })[character]!)
}

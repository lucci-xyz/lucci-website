import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { forthcomingItems } from "./site-data"

const CONTENT_DIR = path.join(process.cwd(), "content", "writing")

export type NoteFrontmatter = {
  title: string
  description: string
  date: string // YYYY-MM-DD
  format: string // e.g. "Research note", "Working paper"
  published?: boolean
}

export type Note = {
  slug: string
  frontmatter: NoteFrontmatter
  content: string
}

export type WritingListItem = {
  slug?: string
  title: string
  description: string
  format: string
  dateISO: string
  dateLabel: string
}

export function formatMonthYear(iso: string) {
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(iso))
}

export function formatFullDate(iso: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(iso))
}

// Shared by the h2 renderer and the TOC extractor so anchors always match.
export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export function getPublishedNotes(): Note[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx") && !file.startsWith("_"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8")
      const { data, content } = matter(raw)
      return { slug: file.replace(/\.mdx$/, ""), frontmatter: data as NoteFrontmatter, content }
    })
    .filter((note) => note.frontmatter.published !== false)
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1))
}

export function getNote(slug: string): Note | undefined {
  return getPublishedNotes().find((note) => note.slug === slug)
}

// Published notes from content/writing plus forthcoming placeholders, newest first.
export function getWritingIndex(): WritingListItem[] {
  const published: WritingListItem[] = getPublishedNotes().map((note) => ({
    slug: note.slug,
    title: note.frontmatter.title,
    description: note.frontmatter.description,
    format: note.frontmatter.format,
    dateISO: note.frontmatter.date,
    dateLabel: formatMonthYear(note.frontmatter.date),
  }))
  const forthcoming: WritingListItem[] = forthcomingItems.map((item) => ({
    title: item.title,
    description: item.description,
    format: item.format,
    dateISO: item.dateISO,
    dateLabel: formatMonthYear(item.dateISO),
  }))
  return [...published, ...forthcoming].sort((a, b) => (a.dateISO < b.dateISO ? 1 : -1))
}

export function extractHeadings(content: string) {
  return [...content.matchAll(/^##\s+(.+)$/gm)].map((match) => {
    const label = match[1].trim()
    return { id: slugifyHeading(label), label }
  })
}

import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

// Canonical authoring: Loop repository, research/REPRODUCING.md.
// This website file is a generated copy; preserve its publication gate.
export function getLoopGuide() {
  const filename = path.join(process.cwd(), "content/docs/loop.mdx")
  if (!fs.existsSync(filename)) return undefined
  const { data, content } = matter(fs.readFileSync(filename, "utf8"))
  const privatePreview = process.env.LOOP_PRIVATE_PREVIEW === "1" &&
    process.env.NODE_ENV === "development" && !process.env.VERCEL
  if (data.published !== true && !privatePreview) return undefined
  if (typeof data.title !== "string" || typeof data.description !== "string") return undefined
  return { title: data.title, description: data.description, content, published: data.published === true }
}

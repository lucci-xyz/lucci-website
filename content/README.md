# Writing — how publishing works

**Author notes in the private repo: [lucci-xyz/writing](https://github.com/lucci-xyz/writing).**
The `.mdx` files in `content/writing/` here are sync artifacts — a GitHub Action
in that repo copies every note marked `published: true` into this directory and
pushes, which triggers the Vercel deploy. Do not edit them here; edits belong in
the writing repo (drafts with `published: false` never leave it).

The Writing index, the paper pages, and the ⌘K palette all derive from these
files automatically — there is no list to maintain anywhere.

The full authoring guide and the note template (`_template.mdx`) live in the
writing repo's README.

The index and command menu show published articles only, ordered by publication
date from newest to oldest. Forthcoming placeholders are not listed.

## Rendering

`app/writing/[slug]/page.tsx` renders each note through the post template:
frontmatter drives the hero and citation, `##` headings become the scrollspy
TOC, and `Sidenote` / `Figure` / `ManifestDiagram` (see `components/mdx.tsx`)
are available inline. Images sync to `public/writing/<slug>/`.

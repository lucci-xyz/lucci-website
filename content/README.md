# Writing — how publishing works

Every research note is one `.mdx` file in `content/writing/`. The Writing index,
the paper pages, and the ⌘K palette all derive from these files automatically —
there is no list to maintain anywhere else.

## Publish a note

1. Copy `writing/_template.mdx` to `writing/<your-slug>.mdx` (the filename becomes
   the URL: `/writing/<your-slug>`).
2. Fill in the frontmatter — `title`, `description`, `date` (YYYY-MM-DD), `format`
   (e.g. "Research note", "Working paper", "Design study").
3. Write. `##` headings become the table of contents; sidenotes, figures, images,
   and tables are all shown in the template.
4. While drafting, keep `published: false` — the note is invisible on the site.
5. When ready: set `published: true`, commit, push. Vercel deploys automatically;
   the note is live in about a minute.

## Images

Put files in `public/writing/<your-slug>/` and reference them as
`/writing/<your-slug>/image.png`. Wrap in `<Figure caption="…">` for a caption.

## Forthcoming teasers

To tease unwritten work on the index ("Forthcoming"), add an entry to
`lib/site-data.ts` — these are titles only, with no page behind them. Remove the
entry when the real note ships.

## Writing on the go

The content is plain text in this repo, so anything that can edit the repo can
write with you:

- **Phone**: GitHub mobile app → edit file → commit.
- **Browser**: press `.` on the repo page (github.dev) for a full editor.
- **Agents**: Claude Code or any agent with repo access can draft, edit, and
  publish notes — point it at `content/writing/` and this README.

Keep the repository private if drafts (`published: false`) should stay private
before they ship — the site deploys from a private repo just the same.

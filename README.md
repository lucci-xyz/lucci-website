# Lucci Labs Website

The public research and development site for Lucci Labs.

## Routes

- `/` — research-first homepage
- `/research` — publication index
- `/research/context-as-infrastructure` — long-form research note
- `/projects` — public GitHub projects, refreshed hourly
- `/docs` — API and SDK interface preview
- `/docs/loop` — Loop numerical reproduction guide, gated until publication
- `/llms.txt` — machine-readable documentation index
- `/openapi.json` — preview OpenAPI schema
- `/privacy` — privacy policy for the website and Taste

## Stack

- Next.js 15 App Router
- TypeScript
- Geist and Geist Mono
- Vercel Analytics
- GitHub REST API for public project metadata

## Development

```bash
npm install
npm run dev
```

Research signup on the home and Writing pages is described in [docs/research-subscriptions.md](docs/research-subscriptions.md). A separate confirmation email is required before an address joins the Resend research segment; publishing a note never sends an update automatically.

The projects page uses the public GitHub API. Set `GITHUB_TOKEN` in environments where a higher API rate limit is needed.

## Loop documentation source

The guide in `content/docs/loop.mdx` is a generated copy of the Loop repository's `research/REPRODUCING.md`. Author changes in Loop, then refresh this copy without modifying its frontmatter. Keep the two files byte-identical. The report's source remains in the writing repository.

An unpublished guide is hidden from production and from docs navigation. An isolated local review can admit it only with `LOOP_PRIVATE_PREVIEW=1`, `NODE_ENV=development` and no Vercel environment. This does not authorize release. Before an approved publication, update actual artifact links, access/license statements and the guide's publication flag in its canonical source. Coordinate its release with the report so reciprocal links resolve.

Search-engine change notifications use the public key and existing deployment workflow described in [docs/indexnow.md](docs/indexnow.md). The command defaults to a dry run.

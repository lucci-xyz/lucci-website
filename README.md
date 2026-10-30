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

Research signup on the home and Writing pages is described in [docs/research-subscriptions.md](docs/research-subscriptions.md). A sign-up joins the Resend research segment at once and gets one welcome email; publishing a note never sends an update automatically.

The projects page uses the public GitHub API. Set `GITHUB_TOKEN` in environments where a higher API rate limit is needed.

## Loop documentation source

The guide in `content/docs/loop.mdx` is a generated copy of the Loop repository's `research/REPRODUCING.md`. Author changes in Loop, then refresh this copy without modifying its frontmatter. Keep the two files byte-identical. The report's source remains in the writing repository.

An unpublished guide is hidden from production and from docs navigation. An isolated local review can admit it only with `LOOP_PRIVATE_PREVIEW=1`, `NODE_ENV=development` and no Vercel environment. This does not authorize release. Before an approved publication, update actual artifact links, access/license statements and the guide's publication flag in its canonical source. Coordinate its release with the report so reciprocal links resolve.

Search-engine change notifications use the public key and existing deployment workflow described in [docs/indexnow.md](docs/indexnow.md). The command defaults to a dry run.

## PR screenshot evidence

The existing Actions check builds the PR locally and captures Home, Writing, the
published Portable context article and Privacy at desktop (1440×1000) and phone
(390×844) sizes. Open the PR check's job summary and download the eight PNGs and
per-capture candidate/checkout receipts. The artifact expires after three days;
your GitHub account needs access to this private repository. No Vercel seat or
preview login is needed to download it.

These are CI production-build stills, not deployed Vercel preview proof. They use
checked-in published content; private Loop preview mode stays off and private
routes are not captured. Forms are not submitted; browser API/POST and external
requests are blocked. HTTP errors, login/error pages, redirects, client errors,
unloaded imagery and capture failures fail the job. Failure diagnostics are
separate from successful evidence. The fixed route/headline contracts are in
`scripts/screenshot-evidence.mjs`; this is visual evidence, not pixel-diff testing
or coverage of every page.

The workflow adds one bounded local build and capture to the existing Linux job,
not another runner or deployment workflow. Existing Vercel Git previews may still
run when branches are published; their settings and protected access are not
changed or bypassed. Production hosting, main deployment and IndexNow remain
unchanged. Existing Actions minutes/artifact allowance is consumed; zero cost is
not assumed. No production secrets are needed for capture.

# Lucci Labs Website

The public research and development site for Lucci Labs.

## Routes

- `/` — research-first homepage
- `/research` — publication index
- `/research/context-as-infrastructure` — long-form research note
- `/projects` — public GitHub projects, refreshed hourly
- `/docs` — API and SDK interface preview
- `/llms.txt` — machine-readable documentation index
- `/openapi.json` — preview OpenAPI schema

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

The projects page uses the public GitHub API. Set `GITHUB_TOKEN` in environments where a higher API rate limit is needed.

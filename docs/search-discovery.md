# Search discovery implementation and verification

October 24, 2026. Scope: the existing Lucci company and research sites, using their existing Next.js deployments. No new subscriptions, analytics systems or publishing pipelines.

## Requirements

- Give each public HTML page its own canonical URL, search description and social preview.
- Describe the real organization relationship, services and published articles with JSON-LD. Never invent clients, results, offices or availability.
- Advertise public canonical URLs in robots.txt and an XML sitemap. Exclude action and subscription status pages.
- Supply a source index and optional Markdown summaries. Research exports, feed and discovery lists require an explicit published: true flag. Preserve publication source files and raw-media privacy.
- Preserve the approved visual system, consent handling, subscription flows and deployment gates.

## Implementation steps

- [x] Reproduce missing metadata and discovery files using scripts/check-seo.py against the public domain.
- [x] Add shared metadata and safe JSON-LD serialization; update each public route.
- [x] Add the site-specific discovery routes and internal links. HQ adds three static service detail pages and preview-host noindex handling. Enable HTTPS at Cloudflare after specific approval; do not implement protocol redirects in Next middleware. Labs adds RSS and published Markdown sources, permanent legacy redirects and noindex subscription status.
- [x] Run existing tests, type checking, production builds and rendered HTTP checks. Check draft exclusions and special-character escaping. Verify desktop and narrow layouts.
- [x] Open a pull request. Production deployment, domain settings and search-provider setup need Natalie's specific approval under the existing operating rules.

## Verification

Run python3 scripts/check-seo.py http://127.0.0.1:PORT --site hq or --site labs against an isolated production build. The test validates rendered canonical URLs, social metadata, JSON-LD, sitemap and discovery responses, real 404s, permanent legacy redirects and subscription noindex. The existing subscription and attribution tests must still pass. Validate the Cloudflare Worker build separately for HQ. A passed local check is not a production or indexing claim.

## Review focus

Missing publication flags must never release a source. Dates are actual publication dates; sitemap lastmod is omitted rather than invented. JSON-LD escapes script markup. Markdown representations identify canonical HTML and are noindex to avoid competing copies. Search crawler headers alone do not prove access from a provider's real IPs. Third-party agent-readiness scores are snapshots, not ranking or citation measurements.

The Markdown homepage uses the same Loop guide publication gate as the sitemap and llms.txt. Tests cover missing and unpublished guides. The independently merged HTML publication safeguard from main is included; new discovery outputs also require published: true.

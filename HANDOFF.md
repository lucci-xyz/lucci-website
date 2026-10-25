# Handoff

Updated October 25, 2026 on `codex/google-tag-queue`.

## Google tag command format

- Workspace: `/home/nat/lucci/.worktrees/lucci-website-seo`, branch `codex/google-tag-queue`, based on merged `origin/main` at `3b9679a`. The prior SEO branch is preserved.
- `createGoogleTag(queue: unknown[])` in `lib/analytics.ts` returns a normal function that pushes its `arguments` object. `components/analytics-consent.tsx` uses that helper with the existing data layer. Consent, sanitized URL/referrer context and event payloads are unchanged.
- The regression first failed against the extracted previous arrow implementation: `[object Array]` instead of `[object Arguments]`. With the fix, it checks the command object type, non-array status, ordered commands, indexed payloads and preservation of existing queue entries. Full suite: 27 tests passed; TypeScript passed; `npm run build` with the existing Labs measurement ID passed.
- Official references checked October 25, 2026: [gtag.js setup](https://developers.google.com/tag-platform/gtagjs) and [data layer installation](https://developers.google.com/tag-platform/tag-manager/datalayer#installation). Both show a normal function pushing `arguments`.
- This branch is ready for targeted review. No deployment, production telemetry or provider setting change was performed as part of this fix. After approval and release, verify the actual consented Google Analytics request separately.

## Earlier search discovery review

- Branch/workspace: `/home/nat/lucci/.worktrees/lucci-website-seo`, based on main at task start and merged with main at 4fc6f91 to preserve the independently approved strict HTML publication gate and standard-build tests. Adds canonical/social/article metadata, organization identity, robots/sitemap, published-only RSS and Markdown/MDX exports, permanent legacy redirects, subscription noindex and a current homepage research link.
- npm test: 13 passed; TypeScript and Next production build passed; 110 rendered discovery checks passed. Publication tests cover false, absent and string publication flags, as well as missing/unpublished Loop guides. Both desktop and phone layouts were inspected. A separate code review found no critical issues; the guide-link gate it identified was corrected and tested. See [technical scope and verification](docs/search-discovery.md).
- The marketing audit and profile/content recommendations are in the restricted Lucci Drive [audit document](https://docs.google.com/document/d/1Va3Rsy-l_jlxXimL5XkhLFTBeXATaJ8o1VSFGbRFD7Q). Strategy stays there, not in Git.
- No production deployment, provider settings, search submission, public-profile edit or email send occurred in this task. Obtain Natalie's specific approval before merging/deploying.
- Next after approval: deploy via existing pipeline, verify both custom domains and discovery URLs, enable HQ Always Use HTTPS at Cloudflare, then establish verified Google Search Console and Bing Webmaster Tools properties and submit each sitemap. Indexing/ranking and provider citations remain unverified.

Review: [Labs PR #33](https://github.com/lucci-xyz/lucci-website/pull/33), awaiting specific merge/deployment approval.

## Existing integration context

- HQ attribution/analytics PR #11 and Labs PR #32 are merged in the base main branches. The sites use separate GA4 streams and retain existing consent and first/latest campaign handling. No cross-domain visitor continuity was added.
- HQ Cloudflare Web Analytics was observed collecting visits, page views and Web Vitals during this audit. The earlier handoff's claim that it was off is stale. The prior website chat also verified Labs Vercel analytics through its dashboard; the earlier API error did not establish it was disabled.
- The single Lucci Labs Research segment and existing Resend confirmation flow remain in place. Provider settings were not reconfigured here, and any live email test needs separate approval. See existing analytics and research-subscription documentation.

## SEO completion release — 2026-10-25

This release adds opt-in, bounded IndexNow notification after successful production deploys, with a hosted public ownership key and canonical/noindex/sitemap validation. Set GitHub Actions `INDEXNOW_ENABLED=true` only when enabling automatic notifications. Submission receipts do not establish indexing. See `docs/indexnow.md`.

GA4 configuration and events use sanitized campaign URLs and origin-only referrers. Analytics remains opt-in. Labs distinguishes confirmation-email requests from signed, consented confirmation completions; actual subscribers remain in the single Resend research segment.

The existing Lucci Drive audit owns release receipts, live account checks, query baselines and marketing follow-up: https://docs.google.com/document/d/1Va3Rsy-l_jlxXimL5XkhLFTBeXATaJ8o1VSFGbRFD7Q. Do not copy its business strategy into this repository.

Labs keeps publication edits in `lucci-xyz/writing`; generated `content/writing` copies must continue to come from that source. The article identity now links the existing author ORCID. Vercel aggregate analytics removes queries and fragments.

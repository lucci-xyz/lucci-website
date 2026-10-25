# Handoff

Updated October 24, 2026 on `codex/search-discovery`.

## Search discovery review

- Branch/workspace: `/home/nat/lucci/.worktrees/lucci-website-seo`, based on current main at task start. Adds canonical/social/article metadata, organization identity, robots/sitemap, published-only RSS and Markdown/MDX exports, permanent legacy redirects, subscription noindex and a current homepage research link.
- npm test: 12 passed; TypeScript and Next production build passed; 110 rendered discovery checks passed. Publication tests cover false, absent and string publication flags, as well as missing/unpublished Loop guides. Both desktop and phone layouts were inspected. A separate code review found no critical issues; the guide-link gate it identified was corrected and tested. See [technical scope and verification](docs/search-discovery.md).
- The marketing audit and profile/content recommendations are in the restricted Lucci Drive [audit document](https://docs.google.com/document/d/1Va3Rsy-l_jlxXimL5XkhLFTBeXATaJ8o1VSFGbRFD7Q). Strategy stays there, not in Git.
- No production deployment, provider settings, search submission, public-profile edit or email send occurred in this task. Obtain Natalie's specific approval before merging/deploying.
- Next after approval: deploy via existing pipeline, verify both custom domains and discovery URLs, enable HQ Always Use HTTPS at Cloudflare, then establish verified Google Search Console and Bing Webmaster Tools properties and submit each sitemap. Indexing/ranking and provider citations remain unverified.

## Existing integration context

- HQ attribution/analytics PR #11 and Labs PR #32 are merged in the base main branches. The sites use separate GA4 streams and retain existing consent and first/latest campaign handling. No cross-domain visitor continuity was added.
- HQ Cloudflare Web Analytics was observed collecting visits, page views and Web Vitals during this audit. The earlier handoff's claim that it was off is stale. The prior website chat also verified Labs Vercel analytics through its dashboard; the earlier API error did not establish it was disabled.
- The single Lucci Labs Research segment and existing Resend confirmation flow remain in place. Provider settings were not reconfigured here, and any live email test needs separate approval. See existing analytics and research-subscription documentation.

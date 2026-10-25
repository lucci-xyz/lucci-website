# Handoff

Updated October 24, 2026 on `codex/free-analytics-utm`.

## Current state

- [Labs PR #32](https://github.com/lucci-xyz/lucci-website/pull/32) is open for review. It adds first/latest UTM attribution to research confirmation tokens, a consent-gated GA4 integration, and updated privacy text. The one Lucci Labs Research segment remains the only research list.
- TypeScript, Next.js, subscription tests, and attribution tests passed. Vercel preview check passed. No production deployment or signup email test occurred. The existing lint command cannot run because eslint is absent from the repository's installed dependencies.
- Natalie specifically approved one Resend `research_attribution` string contact property and `RESEND_RESEARCH_ATTRIBUTION_PROPERTY=research_attribution` in the Labs Vercel project; both are configured for production and preview. A confirmed subscriber's first/latest tagged visit is saved there when this PR is deployed.
- [HQ PR #11](https://github.com/lucci-xyz/luccihq/pull/11) contains the matching company-site capture and link builder. Natalie supplied separate GA4 IDs: Labs `G-3G1SWD874P`, HQ `G-60WESFBW9C`; the sites report to separate streams without cross-domain visitor continuity. The Labs Vercel Production and Preview `NEXT_PUBLIC_GA_MEASUREMENT_ID` variable is configured, but existing builds do not include it.
- Natalie approved Vercel Web Analytics activation. The API still says `Web Analytics not found`; this environment has no connected tool to enable it. The Analytics component is already in the code.

## Next step

After review and specific deployment approval, merge/deploy and verify Labs GA4 campaign reporting and research attribution. Natalie can enable free Vercel Web Analytics in the Labs project's Analytics tab. The technical setup is in [HQ analytics setup](https://github.com/lucci-xyz/luccihq/blob/codex/free-analytics-utm/docs/analytics.md). Any email test needs separate specific approval.

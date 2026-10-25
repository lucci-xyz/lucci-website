# Handoff

Updated October 24, 2026 on `codex/free-analytics-utm`.

## Current state

- [Labs PR #32](https://github.com/lucci-xyz/lucci-website/pull/32) is open for review. It adds first/latest UTM attribution to research confirmation tokens, a consent-gated GA4 integration, and updated privacy text. The one Lucci Labs Research segment remains the only research list.
- TypeScript, Next.js, subscription tests, and attribution tests passed. Vercel preview check passed. No production deployment or signup email test occurred. The existing lint command cannot run because eslint is absent from the repository's installed dependencies.
- Natalie specifically approved one Resend `research_attribution` string contact property and `RESEND_RESEARCH_ATTRIBUTION_PROPERTY=research_attribution` in the Labs Vercel project; both are configured for production and preview. A confirmed subscriber's first/latest tagged visit is saved there when this PR is deployed.
- [HQ PR #11](https://github.com/lucci-xyz/luccihq/pull/11) contains the matching company-site capture and link builder. GA4 is not active because Natalie still needs to create its property and provide a `G-` measurement ID. The Vercel Web Analytics API currently says `Web Analytics not found` despite the script in the code; activation approval has been requested.

## Next step

After review and specific deployment approval, set `NEXT_PUBLIC_GA_MEASUREMENT_ID` on the Labs Vercel project to the same ID used for HQ, then merge/deploy and verify campaign reporting and research attribution. The technical setup is in [HQ analytics setup](https://github.com/lucci-xyz/luccihq/blob/codex/free-analytics-utm/docs/analytics.md). Any email test needs separate specific approval.

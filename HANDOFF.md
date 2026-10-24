# Handoff

Updated October 24, 2026 on branch `codex/research-subscriptions` in `/home/nat/lucci/lucci-website-research-subscriptions`.

The Lucci Labs site now has a research signup component on Home and Writing, a signed email confirmation flow, and a Resend segment integration. The matching company-site change is in `/home/nat/lucci/luccihq-research-subscriptions`. Both are review branches; production has not changed. Research updates remain manual, as Natalie requested. See [the subscription runbook](docs/research-subscriptions.md) for settings, verification, and sending procedure.

`npm run test:subscriptions`, `npx tsc --noEmit`, and `npm run build` passed. Local invalid input returned 400, a bot honeypot returned 200 without sending, and a valid request with no runtime key returned 503. No email was sent and no Resend contact was created. Remaining: review PRs; with Natalie's specific approval create the dedicated Resend segment and full access key, configure the three Labs runtime settings, then approve production deployment and one confirmation-email test. Deploy Labs before the HQ form change.

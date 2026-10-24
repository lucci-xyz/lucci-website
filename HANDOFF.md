# Handoff

Updated October 24, 2026 on branch `codex/research-subscriptions` in `/home/nat/lucci/lucci-website-research-subscriptions`.

The Lucci Labs site now has a research signup component on Home and Writing, a signed email confirmation flow, and a Resend segment integration. [Labs PR #28](https://github.com/lucci-xyz/lucci-website/pull/28) and [HQ PR #7](https://github.com/lucci-xyz/luccihq/pull/7) are review branches; production has not changed. Research updates remain manual, as Natalie requested. See [the subscription runbook](docs/research-subscriptions.md) for settings, verification, and sending procedure.

`npm run test:subscriptions`, `npx tsc --noEmit`, and `npm run build` passed. Local invalid input returned 400, a bot honeypot returned 200 without sending, and a valid request with no runtime key returned 503. Vercel's PR preview check passed. With Natalie's specific approval, the `Lucci Labs Research` segment and dedicated full-access key were created in Resend, and all three required variables were added to the Labs Vercel **production** target. Their names and targets were verified without decrypting secrets. No email was sent and no Resend contact was created. Remaining: PR review, explicit production approval, then one separately approved confirmation-email test. Deploy Labs before the HQ form change.

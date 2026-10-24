# Handoff

Updated October 24, 2026 in `/home/nat/lucci/lucci-website-compact-signup` on `codex/compact-research-signup`.

## Current state

- [Labs PR #28](https://github.com/lucci-xyz/lucci-website/pull/28) merged and deployed to [luccilabs.xyz](https://luccilabs.xyz/). Home and Writing offer the same confirmed research subscription. The API sends a confirmation from `research@luccilabs.xyz`; only a completed confirmation adds a contact to the dedicated Resend segment.
- One specifically approved live signup for `contact@luccilabs.xyz` returned 200, its confirmation email arrived, the confirmation returned `status=confirmed`, and Resend listed the contact in `Lucci Labs Research` with `unsubscribed: false`. No research update was sent. Updates remain review-before-send, as Natalie requested. See [the subscription runbook](docs/research-subscriptions.md).
- Natalie found the new signup too large and wordy. This branch makes it a compact, single-row form on both Labs pages. The related HQ branch moves its form above the full-screen statement so visitors can find it.

## Next step

Review the compact signup PR and its preview. Merge/deploy only with Natalie's specific approval; then verify Home and Writing on production. No additional email test is needed for this visual change.

# Research subscriptions

Both `luccilabs.xyz` and `luccihq.com` collect signups for one **Lucci Labs Research** segment in Resend. Sign-up is single opt-in, as Natalie decided on 2026-10-25. The Labs site owns the API: a valid form submission adds the address to the segment at once, with no confirmation email. A new member then gets the *Research subscription · Welcome* template (alias `research-subscription-welcome`) from `Research <research@luccilabs.xyz>`. The company site forwards its form request to the Labs API and stores no copy.

The welcome goes through Resend Automations, not a direct send, because automation emails fill in the template's `{{{RESEND_UNSUBSCRIBE_URL}}}` link. After adding a new member, the API sends the custom event `research.subscribed` for that address. The automation *Research subscription welcome* sends the template when the event arrives. An address that is already in the segment gets no event, so repeated sign-ups send no second welcome. A contact that unsubscribed earlier is never re-added. Every accepted request gets the same reply, so the form doesn't reveal which addresses are listed. A failed welcome event is logged and the subscription still stands.

Links in confirmation emails sent before this change still work at `/subscribe/confirm` until they expire, and a new member who confirms there also gets the welcome.

Research updates are **drafted automatically and sent by hand**. When a `lucci-xyz/writing` note goes live for the first time, its publish workflow creates a draft Resend Broadcast to the Lucci Labs Research segment from the *Research published* template (alias `research-published`), which sets the sender, postal address and unsubscribe footer. Natalie reviews the recipients and content in Resend and sends it; the workflow has no send or scheduling mode. The writing repository's README, under Newsletter, covers its settings. Resend [segments](https://resend.com/docs/api-reference/segments/create-segment) and [Broadcasts](https://resend.com/docs/api-reference/broadcasts/create-broadcast) supply list management and unsubscribe handling.

## Runtime settings

The Labs Vercel project needs:

| Setting | Purpose |
| --- | --- |
| `RESEND_RESEARCH_API_KEY` | A dedicated Resend **full access** API key; contact creation is unavailable to send-only keys. Keep it only in Vercel environment settings. |
| `RESEND_RESEARCH_SEGMENT_ID` | ID of the dedicated Lucci Labs Research segment. |
| `RESEARCH_SIGNUP_SECRET` | A long random secret for signed confirmation links. Sign-up no longer needs it; keep it until the last confirmation links sent before 2026-10-25 have expired. |
| `RESEARCH_SITE_URL` | Optional; defaults to `https://luccilabs.xyz`. Use a preview URL only for isolated review. |

On October 24, 2026, Natalie approved creating the `Lucci Labs Research` segment and a dedicated `lucci-labs-research-signups` full-access key. The three required settings above were saved to the Labs Vercel **production** environment and verified by name and target. Their values are absent from Git and this document. Preview deployments deliberately lack those credentials, so a valid preview signup returns unavailable rather than sending mail.

The company site requires no new secret. `RESEARCH_SUBSCRIBE_URL` optionally overrides its Labs API destination for isolated preview testing; production defaults to `https://luccilabs.xyz/api/subscribe`. Deploy Labs and configure its runtime first, then deploy HQ. Do not share the Labs API key with HQ or Git. The existing HQ contact-form key and variables remain separate.

## Verification

1. Run `npm test`, `npx tsc --noEmit`, and `npm run build` in Labs; run `npm run typecheck` and `npm run build` in HQ.
2. Check that invalid JSON, invalid email, and a filled honeypot do not call Resend.
3. Before deploying, check in Resend that the *Research subscription welcome* automation is enabled and its trigger is `research.subscribed`.
4. After deployment approval, test one signup only with specific approval for the welcome email. Confirm the contact is in the research segment, that the automation run sent the welcome, that a second signup sends nothing, and that a prior globally unsubscribed contact stays unsubscribed.
5. Review the form on desktop and phone, and make a **draft** Broadcast to verify the sender and unsubscribe footer without sending it.

Without a confirmation step, anyone can sign up any address, and each new address gets one welcome. The endpoint has a honeypot; if abuse appears, add provider edge rate limiting. No research update is scheduled or sent automatically.

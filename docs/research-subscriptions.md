# Research subscriptions

Both `luccilabs.xyz` and `luccihq.com` collect signups for one **Lucci Labs Research** segment in Resend. The Labs site owns the API and sends a confirmation from `Lucci Labs <research@luccilabs.xyz>`. A click opens a confirmation page; the address enters the segment only after a second button press. The company site forwards its form request to the Labs API and stores no copy.

Research updates are **manual**. Publishing a writing article does not send email. For each new post, draft a Resend Broadcast to the Lucci Labs Research segment, set the sender to `research@luccilabs.xyz`, include the post link and Resend's unsubscribe footer, review recipients and content, then send only with Natalie's specific approval. Resend [segments](https://resend.com/docs/api-reference/segments/create-segment) and [Broadcasts](https://resend.com/docs/api-reference/broadcasts/create-broadcast) supply list management and unsubscribe handling.

## Runtime settings

The Labs Vercel project needs:

| Setting | Purpose |
| --- | --- |
| `RESEND_RESEARCH_API_KEY` | A dedicated Resend **full access** API key; contact creation is unavailable to send-only keys. Keep it only in Vercel environment settings. |
| `RESEND_RESEARCH_SEGMENT_ID` | ID of the dedicated Lucci Labs Research segment. |
| `RESEARCH_SIGNUP_SECRET` | A long random secret for signed confirmation links. Generate once and retain across deployments so outstanding links remain valid. |
| `RESEARCH_SITE_URL` | Optional; defaults to `https://luccilabs.xyz`. Use a preview URL only for isolated review. |

On October 24, 2026, Natalie approved creating the `Lucci Labs Research` segment and a dedicated `lucci-labs-research-signups` full-access key. The three required settings above were saved to the Labs Vercel **production** environment and verified by name and target. Their values are absent from Git and this document. Preview deployments deliberately lack those credentials, so a valid preview signup returns unavailable rather than sending mail.

The company site requires no new secret. `RESEARCH_SUBSCRIBE_URL` optionally overrides its Labs API destination for isolated preview testing; production defaults to `https://luccilabs.xyz/api/subscribe`. Deploy Labs and configure its runtime first, then deploy HQ. Do not share the Labs API key with HQ or Git. The existing HQ contact-form key and variables remain separate.

## Verification

1. Run `npm run test:subscriptions`, `npx tsc --noEmit`, and `npm run build` in Labs; run `npm run typecheck` and `npm run build` in HQ.
2. Check that invalid JSON, invalid email, and a filled honeypot do not call Resend.
3. After deployment approval, test one signup and its confirmation only with specific approval for the confirmation email. Confirm the contact is in the research segment and that a prior globally unsubscribed contact stays unsubscribed.
4. Review the form on desktop and phone, and make a **draft** Broadcast to verify the sender and unsubscribe footer without sending it.

The signup endpoint sends at most one confirmation per address per calendar day through Resend's 24-hour idempotency key. It has a honeypot; if abuse appears, add provider edge rate limiting. Confirmation links expire within 48 hours and contain a signed address, so only the address owner can complete a subscription. No research update is scheduled or sent automatically.

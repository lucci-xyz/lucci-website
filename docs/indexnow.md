# IndexNow change notifications

The site uses the existing Vercel deployment and GitHub Actions. No paid service, runtime endpoint or new account secret is required. The random ownership key is deliberately public at the site root; it is not an account credential.

## Run and verify

Node 22 is sufficient; the notifier adds no dependencies.

```sh
node scripts/indexnow.mjs --urls / /writing
node scripts/indexnow.mjs --urls /writing/a-published-note --submit
git diff --name-only BEFORE_SHA AFTER_SHA > /tmp/changed-files.txt
node scripts/indexnow.mjs --changed-files /tmp/changed-files.txt
```

The default is a dry run: it reads the live sitemap and prints the proposed URLs without contacting IndexNow. Add `--submit` to send once. Every selected URL must be a canonical HTTPS URL in the live public sitemap, without a query or fragment. A submission checks the deployed root key, HTTP 200 HTML, self-canonical URL and absence of noindex first. Redirects, drafts, subscription actions and preview hosts fail closed. Each run is bounded to 100 URLs and one POST; failures, including rate limits, are surfaced without automatic retry.

The public key and content-to-route mapping live in `indexnow.config.json`. Meaningful changes to a page, a published writing source or a configured shared metadata file select the affected live routes. Writing changes also notify the homepage and Writing index. Tooling, README and cosmetic CSS changes select nothing. Deleted or unpublished routes are excluded because they no longer appear in the public sitemap; their names are never inferred for submission. This workflow handles currently public additions and updates, not deletion notifications.

## Production trigger and receipts

`.github/workflows/indexnow.yml` listens for Vercel's successful `Production` deployment status. It checks that the deployed commit belongs to main, compares it with the previous successful production revision, and notifies only the selected current public routes. It skips stale events if a newer successful production deployment exists. A missing earlier revision is a visible skip; use the manual workflow with reviewed recently changed paths.

The workflow also has a manual main-branch trigger with explicit paths. Receipts are in the workflow log and job summary. HTTP 200 means received; HTTP 202 means received with ownership validation pending. Neither proves crawling, indexing, ranking or citation. A failed notification does not roll back the website; inspect the log, correct the key/route issue, then rerun with the affected paths. Disable this workflow to stop automatic notifications. Rotate the key by changing both the config and matching root text file in one deployment.

The implementation follows the [official protocol](https://www.indexnow.org/documentation) and [FAQ](https://www.indexnow.org/faq), checked October 25, 2026. One endpoint shares notifications with participating search engines. Existing XML sitemaps remain the canonical public URL inventory.

Automatic notifications are disabled unless repository Actions variable `INDEXNOW_ENABLED=true` is set. The manual main-branch workflow remains an explicit submission path. To pause only automatic notifications, set this variable to `false`.

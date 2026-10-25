import assert from "node:assert/strict"
import { test } from "node:test"
import { changedUrls, runIndexNow } from "../scripts/indexnow.mjs"

const config = {
  siteUrl: "https://example.org", key: "12345678abcdef00",
  sharedFiles: ["lib/seo.ts"],
  contentRules: [{ prefix: "content/writing/", suffix: ".mdx", urlPrefix: "/writing/", related: ["/", "/writing"] }],
}
const publicUrls = ["https://example.org/", "https://example.org/writing", "https://example.org/writing/published", "https://example.org/privacy"]
const sitemap = "<urlset>" + publicUrls.map(url => "<url><loc>" + url + "</loc></url>").join("") + "</urlset>"

function external({ key = config.key, status = 200, noindex = false, canonical = null } = {}) {
  const posts = []
  return { posts, fetch: async (url, options = {}) => {
    if (url === "https://api.indexnow.org/indexnow") {
      posts.push(JSON.parse(options.body))
      return new Response("", { status })
    }
    if (url === "https://example.org/sitemap.xml") return new Response(sitemap)
    if (url === "https://example.org/" + config.key + ".txt") return new Response(key)
    if (publicUrls.includes(url)) return new Response(
      '<html><head><link rel="canonical" href="' + (canonical ?? url) + '">' +
      (noindex ? '<meta content="' + (noindex === true ? 'noindex,follow' : noindex) + '" name="robots">' : "") + "</head></html>",
      { headers: { "content-type": "text/html" } })
    throw new Error("Unexpected external request " + url)
  }}
}

test("only changed published routes and their indexes are selected; drafts and tooling stay out", () => {
  assert.deepEqual(changedUrls(["content/writing/published.mdx"], publicUrls, config),
    ["https://example.org/writing/published", "https://example.org/", "https://example.org/writing"])
  assert.deepEqual(changedUrls(["content/writing/private-draft.mdx"], publicUrls, config), [])
  assert.deepEqual(changedUrls(["README.md", "app/globals.css", ".github/workflows/check.yml"], publicUrls, config), [])
  assert.deepEqual(changedUrls(["app/privacy/page.tsx"], publicUrls, config), ["https://example.org/privacy"])
  assert.deepEqual(changedUrls(["app/writing/[slug]/page.tsx"], publicUrls, config), ["https://example.org/writing/published"])
  assert.deepEqual(changedUrls(["lib/seo.ts"], publicUrls, config), publicUrls)
})

test("dry run shows a deduplicated plan without posting", async () => {
  const remote = external()
  const result = await runIndexNow({ config, urls: ["/writing", "/writing"], fetchImpl: remote.fetch })
  assert.equal(result.mode, "dry-run")
  assert.deepEqual(result.urlList, ["https://example.org/writing"])
  assert.equal(remote.posts.length, 0)
})

test("cross-host, noncanonical, private, query and fragment URLs fail before any post", async () => {
  for (const url of ["https://evil.example/", "http://example.org/", "/subscribe/confirm", "/writing?email=a", "/writing#secret"]) {
    const remote = external()
    await assert.rejects(runIndexNow({ config, urls: [url], submit: true, fetchImpl: remote.fetch }))
    assert.equal(remote.posts.length, 0)
  }
})

test("wrong ownership key, noindex and mismatched live canonical prevent submission", async () => {
  for (const options of [{ key: "wrong" }, { noindex: true }, { noindex: "none" }, { canonical: "https://example.org/" }]) {
    const remote = external(options)
    await assert.rejects(runIndexNow({ config, urls: ["/writing"], submit: true, fetchImpl: remote.fetch }))
    assert.equal(remote.posts.length, 0)
  }
})

test("a successful preflight sends the protocol payload once and reports receipt only", async () => {
  const remote = external({ status: 202 })
  const result = await runIndexNow({ config, urls: ["/writing"], submit: true, fetchImpl: remote.fetch })
  assert.equal(result.status, 202)
  assert.equal(result.indexingVerified, false)
  assert.deepEqual(remote.posts, [{
    host: "example.org", key: "12345678abcdef00",
    keyLocation: "https://example.org/12345678abcdef00.txt",
    urlList: ["https://example.org/writing"],
  }])
})

test("rate limiting is surfaced without retrying or claiming receipt", async () => {
  const remote = external({ status: 429 })
  await assert.rejects(runIndexNow({ config, urls: ["/writing"], submit: true, fetchImpl: remote.fetch }), /429/)
  assert.equal(remote.posts.length, 1)
})


test("a batch over the bound is rejected before preflight or posting", async () => {
  const urls = Array.from({ length: 101 }, (_, index) => "https://example.org/p" + index)
  const fetchImpl = async url => {
    assert.equal(url, "https://example.org/sitemap.xml")
    return new Response("<urlset>" + urls.map(value => "<url><loc>" + value + "</loc></url>").join("") + "</urlset>")
  }
  await assert.rejects(runIndexNow({ config, urls, submit: true, fetchImpl }), /more than 100 URLs/)
})

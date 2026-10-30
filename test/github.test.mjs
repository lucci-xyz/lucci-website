import assert from "node:assert/strict"
import { test } from "node:test"
import { getLucciRepositories } from "../lib/github.ts"

// lib/github.ts feeds the /building page: it lists the lucci-xyz org's public
// repositories, filters out forks, archived, non-public and named hidden
// repos, maps the API payload to LucciRepository, and falls back to an empty
// list on any failure. fetch is stubbed; no network is touched.

const originalFetch = globalThis.fetch
const originalToken = process.env.GITHUB_TOKEN

function repo(overrides = {}) {
  return {
    name: "harness",
    description: "  Agent harness  ",
    language: "TypeScript",
    stargazers_count: 7,
    updated_at: "2026-10-01T00:00:00Z",
    html_url: "https://github.com/lucci-xyz/harness",
    homepage: "https://example.com",
    fork: false,
    archived: false,
    private: false,
    visibility: "public",
    ...overrides,
  }
}

function stubFetch(handler) {
  const calls = []
  globalThis.fetch = async (url, init) => {
    calls.push({ url, init })
    return handler(url, init)
  }
  return calls
}

function restore() {
  globalThis.fetch = originalFetch
  if (originalToken === undefined) delete process.env.GITHUB_TOKEN
  else process.env.GITHUB_TOKEN = originalToken
}

test("maps public org repositories and trims descriptions", async (t) => {
  t.after(restore)
  delete process.env.GITHUB_TOKEN
  stubFetch(async () => ({ ok: true, json: async () => [repo()] }))
  const repositories = await getLucciRepositories()
  assert.deepEqual(repositories, [
    {
      name: "harness",
      description: "Agent harness",
      language: "TypeScript",
      stars: 7,
      updatedAt: "2026-10-01T00:00:00Z",
      url: "https://github.com/lucci-xyz/harness",
      homepage: "https://example.com",
    },
  ])
})

test("requests the org endpoint and only sends a token header when GITHUB_TOKEN is set", async (t) => {
  t.after(restore)
  delete process.env.GITHUB_TOKEN
  const anonymousCalls = stubFetch(async () => ({ ok: true, json: async () => [] }))
  await getLucciRepositories()
  assert.equal(anonymousCalls.length, 1)
  assert.equal(
    anonymousCalls[0].url,
    "https://api.github.com/orgs/lucci-xyz/repos?type=public&sort=updated&per_page=24",
  )
  assert.equal(anonymousCalls[0].init.headers.Accept, "application/vnd.github+json")
  assert.equal(anonymousCalls[0].init.headers.Authorization, undefined)

  process.env.GITHUB_TOKEN = "fixture-token"
  const authedCalls = stubFetch(async () => ({ ok: true, json: async () => [] }))
  await getLucciRepositories()
  assert.equal(authedCalls[0].init.headers.Authorization, "Bearer fixture-token")
})

test("filters out private, internal, forked, archived and hidden repositories", async (t) => {
  t.after(restore)
  delete process.env.GITHUB_TOKEN
  stubFetch(async () => ({
    ok: true,
    json: async () => [
      repo({ name: "kept" }),
      repo({ name: "secret", private: true }),
      repo({ name: "internal-only", visibility: "internal" }),
      repo({ name: "forked", fork: true }),
      repo({ name: "old", archived: true }),
      repo({ name: "lucci-website" }),
      repo({ name: "FLEX-PAY" }),
      repo({ name: ".github" }),
    ],
  }))
  const repositories = await getLucciRepositories()
  assert.deepEqual(repositories.map((repository) => repository.name), ["kept"])
})

test("uses the fallback description when the API description is missing or blank", async (t) => {
  t.after(restore)
  delete process.env.GITHUB_TOKEN
  stubFetch(async () => ({
    ok: true,
    json: async () => [
      repo({ name: "nodesc", description: null }),
      repo({ name: "blank", description: "   " }),
    ],
  }))
  const repositories = await getLucciRepositories()
  assert.deepEqual(
    repositories.map((repository) => repository.description),
    ["An open-source experiment from Lucci Labs.", "An open-source experiment from Lucci Labs."],
  )
})

test("returns the empty fallback when the API responds with an error status", async (t) => {
  t.after(restore)
  delete process.env.GITHUB_TOKEN
  stubFetch(async () => ({ ok: false, status: 403, json: async () => ({ message: "rate limited" }) }))
  assert.deepEqual(await getLucciRepositories(), [])
})

test("returns the empty fallback when the request throws", async (t) => {
  t.after(restore)
  delete process.env.GITHUB_TOKEN
  stubFetch(async () => {
    throw new Error("network unavailable")
  })
  assert.deepEqual(await getLucciRepositories(), [])
})

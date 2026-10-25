import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { createRequire } from "node:module"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { test } from "node:test"
import vm from "node:vm"
import ts from "typescript"

const require = createRequire(import.meta.url)
const root = fileURLToPath(new URL("../", import.meta.url))
const secret = "fixture-secret-for-subscribe-route-tests"
const fixedNow = Date.UTC(2026, 9, 25, 12)

function routeHarness(provider, now = () => fixedNow) {
  const calls = [], logs = [], modules = new Map()
  class ClockDate extends Date { static now() { return now() } }
  function load(filename) {
    if (modules.has(filename)) return modules.get(filename)
    const exports = {}
    modules.set(filename, exports)
    const code = ts.transpileModule(readFileSync(filename, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
    }).outputText
    vm.runInNewContext(code, {
      exports, Buffer, URL, Request, Response, Date: ClockDate,
      process: { env: { RESEND_RESEARCH_API_KEY: "fixture-not-a-real-key", RESEARCH_SIGNUP_SECRET: secret } },
      console: {
        info: (...values) => logs.push(values),
        error: (...values) => logs.push(values),
      },
      fetch: async (url, options) => {
        assert.equal(url, "https://api.resend.com/emails")
        calls.push({ url, ...options })
        return provider(url, options)
      },
      require: name => name.startsWith("@/")
        ? load(path.join(root, name.slice(2) + ".ts"))
        : name.startsWith(".") ? load(path.resolve(path.dirname(filename), name)) : require(name),
    })
    return exports
  }
  return { POST: load(path.join(root, "app/api/subscribe/route.ts")).POST, calls, logs }
}

const request = attribution => new Request("https://luccilabs.xyz/api/subscribe", {
  method: "POST", headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: "reader@example.com", attribution }),
})

test("only the documented changed-payload conflict is treated as a duplicate confirmation request", async t => {
  for (const [label, status, body, expected] of [
    ["accepted", 200, '{"id":"fixture-email"}', 200],
    ["same daily key, changed payload", 409, '{"name":"invalid_idempotent_request","message":"provider-body-do-not-log"}', 200],
    ["concurrent request still processing", 409, '{"name":"concurrent_idempotent_requests"}', 502],
    ["unknown conflict", 409, '{"name":"some_other_conflict"}', 502],
    ["malformed conflict body", 409, 'not JSON', 502],
    ["null conflict body", 409, 'null', 502],
    ["non-string conflict name", 409, '{"name":409}', 502],
    ["wrong HTTP status with duplicate name", 500, '{"name":"invalid_idempotent_request"}', 502],
    ["rate limit", 429, '{"name":"rate_limit_exceeded"}', 502],
  ]) {
    await t.test(label, async () => {
      const route = routeHarness(async () => new Response(body, { status }))
      const response = await route.POST(request())
      assert.equal(response.status, expected)
      assert.equal(response.headers.get("cache-control"), "no-store")
      if (expected === 200) assert.deepEqual(await response.json(), { ok: true })
      else assert.equal(typeof (await response.json()).error, "string")
      assert.equal(route.calls.length, 1, "must never retry with a different key")
      const log = JSON.stringify(route.logs)
      for (const privateValue of ["reader@example.com", secret, "fixture-not-a-real-key", "provider-body-do-not-log"]) {
        assert.ok(!log.includes(privateValue), "diagnostics must not contain request or provider payloads")
      }
    })
  }
})

test("a repeated campaign keeps the daily key and earlier emailed link instead of sending under a new key", async () => {
  const route = routeHarness(async (_url, options) => new Response(
    route.calls.length === 1 ? '{"id":"fixture-email"}' : '{"name":"invalid_idempotent_request"}',
    { status: route.calls.length === 1 ? 200 : 409 }))
  const touch = source => ({ utm_source: source, landing_path: "/", captured_at: new Date(fixedNow).toISOString() })
  const first = touch("labs"), second = touch("hq")
  assert.equal((await route.POST(request({ first, last: first }))).status, 200)
  assert.equal((await route.POST(request({ first: second, last: second }))).status, 200)
  assert.equal(route.calls.length, 2)
  assert.equal(route.calls[0].headers["Idempotency-Key"], route.calls[1].headers["Idempotency-Key"])
  assert.notEqual(JSON.parse(route.calls[0].body).text, JSON.parse(route.calls[1].body).text,
    "the first request's signed campaign must not be erased to make later payloads match")
})

test("a request crossing UTC midnight uses the same day for its emailed token and send key", async () => {
  const beforeMidnight = Date.UTC(2026, 9, 25, 23, 59, 59, 999)
  let reads = 0
  const route = routeHarness(async () => new Response('{"id":"fixture-email"}'),
    () => beforeMidnight + reads++)
  assert.equal((await route.POST(request())).status, 200)
  const sent = route.calls[0]
  const text = JSON.parse(sent.body).text
  const url = text.match(/https:\/\/[^\s]+/)[0]
  const token = new URL(url).searchParams.get("token")
  const payload = JSON.parse(Buffer.from(token.split(".")[0], "base64url").toString())
  assert.equal(payload.day, 20751)
  assert.equal(sent.headers["Idempotency-Key"],
    "research-confirm/e3e14c05b7831b66eb0ef8d43686494ca096c2cc3874c0c2b15941dc6be9ad72")
})

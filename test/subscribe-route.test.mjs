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
const segment = "fixture-research-segment"
const reader = "reader@example.com"

// A small in-memory stand-in for the Resend contacts, segments and events endpoints.
function resend({ contact = null, segments = [], createStatus = 201, eventStatus = 202, lookupStatus } = {}) {
  return async (url, options = {}) => {
    const { pathname } = new URL(url)
    const method = options.method || "GET"
    const reply = (status, body = {}) => new Response(JSON.stringify(body), { status })
    if (method === "GET" && pathname === `/contacts/${encodeURIComponent(reader)}`) {
      if (lookupStatus) return reply(lookupStatus, { message: "provider-body-do-not-log" })
      return contact ? reply(200, { id: "fixture-contact", email: reader, ...contact }) : reply(404, { name: "not_found" })
    }
    if (method === "GET" && pathname === "/contacts/fixture-contact/segments") {
      return reply(200, { object: "list", data: segments.map(id => ({ id, name: "Fixture" })), has_more: false })
    }
    if (method === "POST" && pathname === `/contacts/${encodeURIComponent(reader)}/segments/${segment}`) return reply(201, { id: segment })
    if (method === "POST" && pathname === "/contacts") return reply(createStatus, { id: "fixture-contact" })
    if (method === "PATCH" && pathname === `/contacts/${encodeURIComponent(reader)}`) return reply(200, { id: "fixture-contact" })
    if (method === "POST" && pathname === "/events/send") return reply(eventStatus, { object: "event", event: "research.subscribed" })
    throw new Error(`unexpected Resend call: ${method} ${pathname}`)
  }
}

function routeHarness(provider, env = {}) {
  const calls = [], logs = [], modules = new Map()
  function load(filename) {
    if (modules.has(filename)) return modules.get(filename)
    const exports = {}
    modules.set(filename, exports)
    const code = ts.transpileModule(readFileSync(filename, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
    }).outputText
    vm.runInNewContext(code, {
      exports, Buffer, URL, Request, Response, Date,
      process: { env: { RESEND_RESEARCH_API_KEY: "fixture-not-a-real-key", RESEND_RESEARCH_SEGMENT_ID: segment, ...env } },
      console: {
        info: (...values) => logs.push(values),
        error: (...values) => logs.push(values),
      },
      fetch: async (url, options) => {
        assert.ok(url.startsWith("https://api.resend.com/"))
        calls.push({ url, method: options?.method || "GET", body: options?.body ? JSON.parse(options.body) : undefined })
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

const request = (body = { email: reader }) => new Request("https://luccilabs.xyz/api/subscribe", {
  method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
})

const events = route => route.calls.filter(call => call.url.endsWith("/events/send"))

function assertPrivateLogs(route) {
  const log = JSON.stringify(route.logs)
  for (const privateValue of [reader, "fixture-not-a-real-key", "provider-body-do-not-log"]) {
    assert.ok(!log.includes(privateValue), "diagnostics must not contain addresses, keys or provider payloads")
  }
}

async function assertAccepted(response) {
  assert.equal(response.status, 200)
  assert.equal(response.headers.get("cache-control"), "no-store")
  assert.deepEqual(await response.json(), { ok: true })
}

test("a new address joins the segment at once and gets one welcome, with no confirmation email", async () => {
  const route = routeHarness(resend())
  await assertAccepted(await route.POST(request()))
  const created = route.calls.find(call => call.method === "POST" && call.url.endsWith("/contacts"))
  assert.deepEqual(created.body, { email: reader, unsubscribed: false, segments: [{ id: segment }] })
  assert.deepEqual(events(route).map(call => call.body), [{ event: "research.subscribed", email: reader }])
  assert.ok(!route.calls.some(call => call.url.endsWith("/emails")), "sign-up must not send a confirmation email")
  assertPrivateLogs(route)
})

test("an existing contact outside the segment is added and welcomed", async () => {
  const route = routeHarness(resend({ contact: { unsubscribed: false }, segments: ["another-segment"] }))
  await assertAccepted(await route.POST(request()))
  assert.ok(route.calls.some(call => call.method === "POST" && call.url.endsWith(`/segments/${segment}`)))
  assert.equal(events(route).length, 1)
})

test("an address already in the segment gets the same reply and no second welcome", async () => {
  const route = routeHarness(resend({ contact: { unsubscribed: false }, segments: [segment] }))
  await assertAccepted(await route.POST(request()))
  assert.ok(!route.calls.some(call => call.method === "POST"), "nothing is added or sent")
})

test("a prior global unsubscribe is never overridden or revealed", async () => {
  const route = routeHarness(resend({ contact: { unsubscribed: true } }))
  await assertAccepted(await route.POST(request()))
  assert.deepEqual(route.calls.map(call => call.method), ["GET"])
})

test("a concurrent sign-up that already created the contact sends no second welcome", async () => {
  const route = routeHarness(resend({ createStatus: 409 }))
  await assertAccepted(await route.POST(request()))
  assert.equal(events(route).length, 0)
})

test("a failed welcome is logged without private data and the subscription still stands", async () => {
  const route = routeHarness(resend({ eventStatus: 500 }))
  await assertAccepted(await route.POST(request()))
  assert.equal(events(route).length, 1, "the welcome event is never retried")
  assert.ok(route.logs.length > 0)
  assertPrivateLogs(route)
})

test("a provider failure before the address is listed asks the visitor to retry", async () => {
  const route = routeHarness(resend({ lookupStatus: 500 }))
  const response = await route.POST(request())
  assert.equal(response.status, 502)
  assert.equal(typeof (await response.json()).error, "string")
  assert.equal(events(route).length, 0)
  assertPrivateLogs(route)
})

test("the honeypot, invalid input and missing settings never call Resend", async () => {
  const honeypot = routeHarness(resend())
  await assertAccepted(await honeypot.POST(request({ email: reader, website: "https://spam.example" })))
  const invalid = routeHarness(resend())
  assert.equal((await invalid.POST(request({ email: "not-an-address" }))).status, 400)
  const unconfigured = routeHarness(resend(), { RESEND_RESEARCH_SEGMENT_ID: "" })
  assert.equal((await unconfigured.POST(request())).status, 503)
  for (const route of [honeypot, invalid, unconfigured]) assert.equal(route.calls.length, 0)
})

test("campaign details are saved on the contact without arbitrary query data", async () => {
  const route = routeHarness(resend(), { RESEND_RESEARCH_ATTRIBUTION_PROPERTY: "research_attribution" })
  const touch = { utm_source: "linkedin", landing_path: "/writing", captured_at: "2026-10-25T12:00:00.000Z", unknown: "private" }
  await assertAccepted(await route.POST(request({ email: reader, attribution: { first: touch, last: touch } })))
  const patch = route.calls.find(call => call.method === "PATCH")
  const saved = JSON.parse(patch.body.properties.research_attribution)
  assert.equal(saved.first.utm_source, "linkedin")
  assert.ok(!JSON.stringify(saved).includes("private"))
})

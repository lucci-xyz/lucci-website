#!/usr/bin/env node
// IndexNow ownership keys are public files, not account credentials.
import { readFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import path from "node:path"

const ENDPOINT = "https://api.indexnow.org/indexnow"
const MAX_URLS = 100
const decodeXml = value => value.replace(/&(amp|lt|gt|quot|apos);/g, (_, entity) =>
  ({ amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" })[entity])

function canonicalUrl(value, origin) {
  const url = new URL(value, origin)
  if (url.origin !== origin || url.protocol !== "https:" || url.search || url.hash || url.username || url.password) {
    throw new Error("Only canonical HTTPS URLs on " + origin + " without queries or fragments are allowed")
  }
  return url.href
}

export function changedUrls(files, publicUrls, config) {
  const allowed = new Set(publicUrls)
  const selected = new Set()
  const add = value => {
    const url = canonicalUrl(value, config.siteUrl)
    if (allowed.has(url)) selected.add(url)
  }
  for (const file of files) {
    if (config.sharedFiles?.includes(file)) return [...allowed]
    for (const rule of config.contentRules ?? []) {
      if (!file.startsWith(rule.prefix) || !file.endsWith(rule.suffix)) continue
      const slug = file.slice(rule.prefix.length, -rule.suffix.length)
      if (!/^[a-z0-9-]+$/.test(slug)) continue
      const url = canonicalUrl(rule.urlPrefix + slug, config.siteUrl)
      // Missing/unpublished notes never enter the live sitemap; don't announce their names.
      if (allowed.has(url)) {
        add(url)
        for (const related of rule.related ?? []) add(related)
      }
    }
    if (/^app\/(.*\/)?page\.[jt]sx$/.test(file)) {
      const route = file.replace(/^app\//, "").replace(/(^|\/)page\.[jt]sx$/, "")
      const pattern = route.split("/").map(segment => {
        if (/^\[\.\.\./.test(segment)) return ".+"
        if (/^\[/.test(segment)) return "[^/]+"
        return segment.replace(/[.*+?^$(){}|\\]/g, "\\$&")
      }).join("/")
      const match = new RegExp("^/" + pattern + "$")
      for (const url of allowed) if (match.test(new URL(url).pathname)) add(url)
    }
  }
  return [...selected]
}

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w-]+)\s*=\s*["']([^"']*)["']/g)]
    .map(match => [match[1].toLowerCase(), decodeXml(match[2])]))
}

export async function runIndexNow({ config, urls = [], changedFiles = [], submit = false, fetchImpl = fetch }) {
  const origin = new URL(config.siteUrl).origin
  if (origin !== config.siteUrl || !origin.startsWith("https://") || !/^[a-zA-Z0-9-]{8,128}$/.test(config.key)) {
    throw new Error("Invalid canonical site origin or public ownership key")
  }
  const request = async (url, options = {}) => fetchImpl(url, {
    ...options, redirect: "error", signal: AbortSignal.timeout(15000),
  })
  const get = async url => {
    const response = await request(url)
    if (response.status !== 200) throw new Error("Preflight failed: " + url + " returned HTTP " + response.status)
    return { response, text: await response.text() }
  }
  const { text: xml } = await get(origin + "/sitemap.xml")
  const publicUrls = [...new Set([...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)]
    .map(match => canonicalUrl(decodeXml(match[1]), origin)))]
  if (!publicUrls.length) throw new Error("Live sitemap has no public URLs")
  const allowed = new Set(publicUrls)
  const urlList = [...new Set([...urls.map(value => canonicalUrl(value, origin)),
    ...changedUrls(changedFiles, publicUrls, config)])]
  if (urlList.length > MAX_URLS) throw new Error("Refusing more than " + MAX_URLS + " URLs; review a smaller changed set")
  for (const url of urlList) if (!allowed.has(url)) throw new Error("URL is absent from the live public sitemap: " + url)
  if (!submit || !urlList.length) {
    return { mode: submit ? "skipped" : "dry-run", urlList, indexingVerified: false }
  }
  const keyLocation = origin + "/" + config.key + ".txt"
  if ((await get(keyLocation)).text.trim() !== config.key) throw new Error("Live ownership key does not match")
  for (const url of urlList) {
    const { response, text } = await get(url)
    if (!response.headers.get("content-type")?.includes("text/html")) throw new Error("Expected public HTML: " + url)
    const tags = [...text.matchAll(/<(?:meta|link)\b[^>]*>/gi)].map(match => attributes(match[0]))
    const canonical = tags.find(tag => tag.rel?.toLowerCase() === "canonical")?.href
    const noindex = /\b(?:noindex|none)\b/i.test(response.headers.get("x-robots-tag") ?? "") ||
      tags.some(tag => /^(robots|googlebot|bingbot)$/i.test(tag.name ?? "") && /\b(?:noindex|none)\b/i.test(tag.content ?? ""))
    if (!canonical || canonicalUrl(canonical, origin) !== url || noindex) throw new Error("Live canonical/noindex preflight failed: " + url)
  }
  const response = await request(ENDPOINT, {
    method: "POST", headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: new URL(origin).host, key: config.key, keyLocation, urlList }),
  })
  if (![200, 202].includes(response.status)) throw new Error("IndexNow returned HTTP " + response.status + "; no automatic retry")
  return { mode: "submitted", status: response.status, urlList, indexingVerified: false,
    message: response.status === 202 ? "URLs received; ownership validation pending. Indexing is unverified." : "URLs received. Indexing is unverified." }
}

async function main() {
  const args = process.argv.slice(2)
  const urls = []
  let changedFiles = [], submit = false
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--submit") submit = true
    else if (args[i] === "--urls") {
      const start = urls.length
      while (args[i + 1] && !args[i + 1].startsWith("--")) urls.push(...args[++i].split(","))
      if (urls.length === start) throw new Error("--urls requires one or more paths or canonical URLs")
    } else if (args[i] === "--changed-files") {
      if (!args[i + 1] || args[i + 1].startsWith("--")) throw new Error("--changed-files requires a newline-delimited file")
      changedFiles = (await readFile(args[++i], "utf8")).split(/\r?\n/).filter(Boolean)
    } else throw new Error("Unknown argument: " + args[i])
  }
  if (!urls.length && !changedFiles.length) {
    console.log(JSON.stringify({ mode: "skipped", urlList: [], message: "Pass --urls /path or --changed-files FILE; add --submit to notify." }, null, 2))
    return
  }
  const config = JSON.parse(await readFile(new URL("../indexnow.config.json", import.meta.url), "utf8"))
  console.log(JSON.stringify(await runIndexNow({ config, urls, changedFiles, submit }), null, 2))
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => { console.error(error.message); process.exitCode = 1 })
}

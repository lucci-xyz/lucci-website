"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { browserAttribution } from "@/lib/attribution"
import { analyticsContext, ANALYTICS_CHOICE_KEY, createGoogleTag } from "@/lib/analytics"

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ""
const choiceKey = ANALYTICS_CHOICE_KEY
let loaded = false

type Choice = "yes" | "no" | null
type GoogleWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void }

function currentContext() {
  return { ...analyticsContext(window.location.href, document.referrer), page_title: document.title }
}

function sendPageView() {
  const g = window as GoogleWindow
  const context = currentContext()
  g.gtag?.("config", measurementId, { ...context, send_page_view: false })
  g.gtag?.("event", "page_view", context)
}

function loadAnalytics() {
  if (loaded || !/^G-[A-Z0-9]+$/.test(measurementId)) return
  loaded = true
  const g = window as GoogleWindow
  g.dataLayer = g.dataLayer || []
  g.gtag = createGoogleTag(g.dataLayer)
  g.gtag("js", new Date())
  g.gtag("consent", "default", {
    analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied",
  })
  g.gtag("config", measurementId, {
    send_page_view: false,
    ...currentContext(),
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  })
  const script = document.createElement("script")
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`
  document.head.appendChild(script)
  window.dispatchEvent(new Event("lucci:analytics-ready"))
}

export function trackConversion(name: "generate_lead" | "sign_up"): boolean {
  try {
    const g = window as GoogleWindow
    if (window.localStorage.getItem(choiceKey) !== "yes" || !g.gtag) return false
    g.gtag("event", name, { ...currentContext(), ...(name === "sign_up" ? { method: "email" } : {}) })
    return true
  } catch { return false }
}

export function AnalyticsConsent() {
  const pathname = usePathname()
  const [choice, setChoice] = useState<Choice>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    browserAttribution()
    try {
      const saved = window.localStorage.getItem(choiceKey)
      if (saved === "yes" || saved === "no") setChoice(saved)
      if (saved === "yes") loadAnalytics()
    } catch { /* Ask again when local storage is unavailable. */ }
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    browserAttribution()
    if (choice === "yes") {
      loadAnalytics()
      sendPageView()
    }
  }, [pathname, ready, choice])

  useEffect(() => {
    const open = () => setChoice(null)
    window.addEventListener("lucci:analytics-preferences", open)
    return () => window.removeEventListener("lucci:analytics-preferences", open)
  }, [])

  function decide(value: "yes" | "no") {
    try { window.localStorage.setItem(choiceKey, value) } catch { /* This visit only. */ }
    setChoice(value)
    if (value === "yes") loadAnalytics()
    if (value === "no" && loaded) window.location.reload()
  }

  if (!ready || choice || !/^G-[A-Z0-9]+$/.test(measurementId)) return null
  return (
    <div className="analytics-consent" role="region" aria-label="Analytics choice">
      <p>May we use Google Analytics to understand visits and campaigns? <a href="/privacy">Privacy details</a></p>
      <div className="analytics-consent-actions">
        <button type="button" onClick={() => decide("no")}>No thanks</button>
        <button type="button" onClick={() => decide("yes")}>Allow analytics</button>
      </div>
    </div>
  )
}

export function AnalyticsPreferences() {
  if (!/^G-[A-Z0-9]+$/.test(measurementId)) return null
  return <button className="analytics-preferences" type="button" onClick={() => window.dispatchEvent(new Event("lucci:analytics-preferences"))}>Change analytics choice</button>
}

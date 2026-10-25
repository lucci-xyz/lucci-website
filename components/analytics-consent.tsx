"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { browserAttribution, UTM_KEYS } from "@/lib/attribution"

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ""
const choiceKey = "lucci_analytics_choice_v1"
let loaded = false

type Choice = "yes" | "no" | null
type GoogleWindow = Window & { dataLayer?: unknown[][]; gtag?: (...args: unknown[]) => void }

function safeLocation() {
  const url = new URL(window.location.href)
  const allowed = new URLSearchParams()
  for (const key of UTM_KEYS) {
    const value = url.searchParams.get(key)
    if (value && !/\S+@\S+\.\S+/.test(value)) allowed.set(key, value.slice(0, 120))
  }
  return `${url.origin}${url.pathname}${allowed.size ? `?${allowed}` : ""}`
}

function sendPageView() {
  const g = window as GoogleWindow
  g.gtag?.("event", "page_view", { page_location: safeLocation(), page_title: document.title })
}

function loadAnalytics() {
  if (loaded || !/^G-[A-Z0-9]+$/.test(measurementId)) return
  loaded = true
  const g = window as GoogleWindow
  g.dataLayer = g.dataLayer || []
  g.gtag = (...args: unknown[]) => { g.dataLayer?.push(args) }
  g.gtag("js", new Date())
  g.gtag("consent", "default", {
    analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied",
  })
  g.gtag("config", measurementId, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  })
  const script = document.createElement("script")
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`
  document.head.appendChild(script)
}

export function trackConversion(name: "generate_lead" | "subscribe_request") {
  try {
    if (window.localStorage.getItem(choiceKey) === "yes") (window as GoogleWindow).gtag?.("event", name)
  } catch { /* Analytics choice storage can be unavailable. */ }
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

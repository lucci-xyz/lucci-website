"use client"

import { useState } from "react"
import { browserAttribution } from "@/lib/attribution"
import { trackConversion } from "@/components/analytics-consent"

export function ResearchSubscribe() {
  const [email, setEmail] = useState("")
  const [website, setWebsite] = useState("")
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle")

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!event.currentTarget.reportValidity()) return
    setState("sending")
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website, attribution: browserAttribution() }),
      })
      if (response.ok && !website.trim()) trackConversion("subscribe_request")
      setState(response.ok ? "done" : "error")
    } catch {
      setState("error")
    }
  }

  return (
    <section className="research-subscribe" aria-labelledby="research-subscribe-title">
      <h2 id="research-subscribe-title">Research updates</h2>
      {state === "done" ? (
        <p className="research-subscribe-status" role="status">Check your inbox to confirm.</p>
      ) : (
        <form onSubmit={submit} className="research-subscribe-form">
          <label className="sr-only" htmlFor="research-subscribe-email">Email address</label>
          <div className="research-subscribe-fields">
            <input id="research-subscribe-email" type="email" autoComplete="email" placeholder="Email address" maxLength={254} required value={email} onChange={(event) => { setEmail(event.target.value); if (state === "error") setState("idle") }} />
            <button type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Subscribe"}</button>
          </div>
          <input className="research-subscribe-honeypot" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={website} onChange={(event) => setWebsite(event.target.value)} />
          {state === "error" && <p className="research-subscribe-error" role="alert">We couldn&apos;t send the confirmation. Please try again later.</p>}
        </form>
      )}
    </section>
  )
}

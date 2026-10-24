"use client"

import { useState } from "react"

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
        body: JSON.stringify({ email, website }),
      })
      setState(response.ok ? "done" : "error")
    } catch {
      setState("error")
    }
  }

  return (
    <section className="research-subscribe" aria-labelledby="research-subscribe-title">
      <div>
        <p className="eyebrow">Research by email</p>
        <h2 id="research-subscribe-title">New work, when it is ready.</h2>
        <p>Receive new Lucci Labs research notes. Occasional emails, with an unsubscribe link in every update.</p>
      </div>
      {state === "done" ? (
        <p className="research-subscribe-status" role="status">Check your inbox to confirm your subscription.</p>
      ) : (
        <form onSubmit={submit} className="research-subscribe-form">
          <label htmlFor="research-subscribe-email">Email address</label>
          <div className="research-subscribe-fields">
            <input id="research-subscribe-email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={254} required value={email} onChange={(event) => { setEmail(event.target.value); if (state === "error") setState("idle") }} />
            <button type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Subscribe to research"}</button>
          </div>
          <input className="research-subscribe-honeypot" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={website} onChange={(event) => setWebsite(event.target.value)} />
          <p className="research-subscribe-note">From research@luccilabs.xyz. Confirm by email before receiving updates.</p>
          {state === "error" && <p className="research-subscribe-error" role="alert">We couldn&apos;t send the confirmation. Please try again later.</p>}
        </form>
      )}
    </section>
  )
}

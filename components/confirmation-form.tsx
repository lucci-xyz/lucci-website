"use client"

import { useRef } from "react"
import { ANALYTICS_CHOICE_KEY } from "@/lib/analytics"

export function ConfirmationForm({ token }: { token: string }) {
  const choice = useRef<HTMLInputElement>(null)
  function submit() {
    if (!choice.current) return
    try { choice.current.value = window.localStorage.getItem(ANALYTICS_CHOICE_KEY) === "yes" ? "yes" : "no" }
    catch { choice.current.value = "no" }
  }
  return <form method="post" action="/api/subscribe/confirm" onSubmit={submit}>
    <input type="hidden" name="token" value={token} />
    <input ref={choice} type="hidden" name="analytics_consent" defaultValue="no" />
    <button type="submit">Confirm subscription</button>
  </form>
}

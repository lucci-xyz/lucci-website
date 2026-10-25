"use client"

import { useEffect } from "react"
import { trackConversion } from "@/components/analytics-consent"
import { ANALYTICS_CHOICE_KEY, recordConfirmation } from "@/lib/analytics"

export function ConfirmedSubscriptionEvent({ receiptId }: { receiptId: string }) {
  useEffect(() => {
    const record = () => {
      try {
        recordConfirmation(receiptId, window.localStorage.getItem(ANALYTICS_CHOICE_KEY), window.sessionStorage, () => trackConversion("sign_up"))
      } catch { /* Analytics and deduplication storage are optional. */ }
    }
    window.addEventListener("lucci:analytics-ready", record)
    record()
    return () => window.removeEventListener("lucci:analytics-ready", record)
  }, [receiptId])
  return null
}

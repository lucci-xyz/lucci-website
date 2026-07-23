"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { researchItems } from "@/lib/site-data"

type Command = {
  id: string
  group: "Navigate" | "Research" | "Actions"
  title: string
  meta?: string
  description?: string
  keywords?: string
  forthcoming?: boolean
  run?: () => void | Promise<"copied" | void>
}

// Loose match: every query token must appear in order somewhere in the haystack.
function matches(haystack: string, query: string) {
  const h = haystack.toLowerCase()
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((token) => {
      if (h.includes(token)) return true
      let i = 0
      for (const ch of h) if (ch === token[i]) i++
      return i >= token.length
    })
}

function rank(haystack: string, query: string) {
  const h = haystack.toLowerCase()
  const q = query.toLowerCase().trim()
  if (!q) return 0
  if (h.startsWith(q)) return 0
  if (h.includes(q)) return 1
  return 2
}

export function CommandPalette() {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [index, setIndex] = useState(0)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [now, setNow] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => {
    setOpen(false)
    setQuery("")
    setIndex(0)
    setCopiedId(null)
  }, [])

  const commands = useMemo<Command[]>(() => {
    const navigate: Command[] = [
      { id: "nav-home", group: "Navigate", title: "Home", meta: "Page", keywords: "index start lucci labs", run: () => router.push("/") },
      { id: "nav-writing", group: "Navigate", title: "Writing", meta: "Page", keywords: "research notes papers publications essays work", run: () => router.push("/writing") },
      { id: "nav-building", group: "Navigate", title: "Building", meta: "Page", keywords: "projects open source github instruments tools systems work", run: () => router.push("/building") },
      { id: "nav-docs", group: "Navigate", title: "Docs", meta: "Page", keywords: "documentation quickstart sdk api", run: () => router.push("/docs") },
    ]
    const research: Command[] = researchItems.map((item) => ({
      id: `research-${item.slug ?? item.title}`,
      group: "Research",
      title: item.title,
      meta: item.slug ? `${item.date} · ${item.format}` : "Forthcoming",
      description: item.description,
      keywords: `${item.format} ${item.category} ${item.description}`,
      forthcoming: !item.slug,
      run: item.slug ? () => router.push(`/writing/${item.slug}`) : undefined,
    }))
    const actions: Command[] = [
      {
        id: "act-email",
        group: "Actions",
        title: "Copy email address",
        meta: "contact@luccilabs.xyz",
        keywords: "contact mail reach write",
        run: async () => {
          await navigator.clipboard?.writeText("contact@luccilabs.xyz")
          return "copied"
        },
      },
      {
        id: "act-github",
        group: "Actions",
        title: "Open GitHub",
        meta: "github.com/lucci-xyz",
        keywords: "code source repositories org",
        run: () => window.open("https://github.com/lucci-xyz", "_blank", "noreferrer"),
      },
      {
        id: "act-llms",
        group: "Actions",
        title: "View llms.txt",
        meta: "For AI agents",
        keywords: "machine readable agent discovery markdown",
        run: () => {
          window.location.href = "/llms.txt"
        },
      },
      {
        id: "act-openapi",
        group: "Actions",
        title: "View OpenAPI schema",
        meta: "For AI agents",
        keywords: "api specification json schema",
        run: () => {
          window.location.href = "/openapi.json"
        },
      },
    ]
    return [...navigate, ...research, ...actions]
  }, [router])

  const results = useMemo(() => {
    if (!query.trim()) return commands
    return commands
      .filter((command) => matches(`${command.title} ${command.keywords ?? ""} ${command.meta ?? ""}`, query))
      .sort((a, b) => rank(a.title, query) - rank(b.title, query))
  }, [commands, query])

  const runCommand = useCallback(
    async (command: Command) => {
      if (!command.run) return
      const outcome = await command.run()
      if (outcome === "copied") {
        setCopiedId(command.id)
        window.setTimeout(close, 900)
      } else {
        close()
      }
    },
    [close],
  )

  // ⌘K / Ctrl+K toggles; Escape closes; header chip opens via a custom event.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setOpen((value) => {
          if (value) {
            setQuery("")
            setIndex(0)
            setCopiedId(null)
          }
          return !value
        })
      }
    }
    function onOpenEvent() {
      setOpen(true)
    }
    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("lucci:cmdk", onOpenEvent)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("lucci:cmdk", onOpenEvent)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
    document.body.style.overflow = "hidden"
    const tick = () => setNow(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }))
    tick()
    const timer = window.setInterval(tick, 1000)
    return () => {
      document.body.style.overflow = ""
      window.clearInterval(timer)
    }
  }, [open])

  // Close when the route actually changes.
  useEffect(() => {
    close()
  }, [pathname, close])

  useEffect(() => {
    setIndex(0)
  }, [query])

  useEffect(() => {
    const active = listRef.current?.querySelector<HTMLElement>('[data-active="true"]')
    active?.scrollIntoView({ block: "nearest" })
  }, [index])

  if (!open) return null

  const enabled = results.filter((command) => !command.forthcoming)
  const highlighted = enabled[Math.min(index, Math.max(enabled.length - 1, 0))]

  function onInputKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape") {
      event.preventDefault()
      close()
    } else if (event.key === "ArrowDown") {
      event.preventDefault()
      setIndex((value) => (enabled.length ? (value + 1) % enabled.length : 0))
    } else if (event.key === "ArrowUp") {
      event.preventDefault()
      setIndex((value) => (enabled.length ? (value - 1 + enabled.length) % enabled.length : 0))
    } else if (event.key === "Enter" && highlighted) {
      event.preventDefault()
      runCommand(highlighted)
    }
  }

  const groups: Command["group"][] = ["Navigate", "Research", "Actions"]

  return (
    <div className="cmdk-overlay" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && close()}>
      <div className="cmdk" role="dialog" aria-modal="true" aria-label="Command menu">
        <div className="cmdk-input-row">
          <input
            ref={inputRef}
            className="cmdk-input"
            value={query}
            placeholder="Search the lab…"
            aria-label="Search commands"
            spellCheck={false}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onInputKeyDown}
          />
          <span className="cmdk-kbd">esc</span>
        </div>
        <div className="cmdk-list" ref={listRef} role="listbox">
          {results.length === 0 && <p className="cmdk-empty">Nothing yet — the search space is still small.</p>}
          {groups.map((group) => {
            const items = results.filter((command) => command.group === group)
            if (items.length === 0) return null
            return (
              <div key={group}>
                <p className="cmdk-group-label">{group}</p>
                {items.map((command) => {
                  const isActive = highlighted?.id === command.id
                  return (
                    <button
                      key={command.id}
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      data-active={isActive || undefined}
                      className={`cmdk-item${isActive ? " active" : ""}${command.forthcoming ? " disabled" : ""}`}
                      onMouseMove={() => {
                        const position = enabled.findIndex((item) => item.id === command.id)
                        if (position >= 0) setIndex(position)
                      }}
                      onClick={() => runCommand(command)}
                      disabled={command.forthcoming}
                    >
                      <span className="cmdk-item-row">
                        <span className={`cmdk-item-title${command.group === "Research" ? " serif" : ""}`}>{command.title}</span>
                        <span className="cmdk-item-meta">{copiedId === command.id ? "Copied" : command.meta}</span>
                      </span>
                      {command.description && isActive && <span className="cmdk-item-desc">{command.description}</span>}
                    </button>
                  )
                })}
              </div>
            )
          })}
        </div>
        <div className="cmdk-footer">
          <span className="cmdk-hints">
            <span className="cmdk-kbd">↑↓</span> navigate <span className="cmdk-kbd">↵</span> select
          </span>
          <span className="cmdk-status">
            <span className="status-dot" aria-hidden="true" /> Lab is active{now ? ` · ${now}` : ""}
          </span>
        </div>
      </div>
    </div>
  )
}

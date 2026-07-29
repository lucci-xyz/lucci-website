// Published notes live as MDX files in content/writing/ — see content/README.md.
// This file only lists forthcoming work so the index can show what's coming.
export type ForthcomingItem = {
  dateISO: string
  format: string
  title: string
  description: string
}

export const forthcomingItems: ForthcomingItem[] = [
  {
    dateISO: "2026-06-15",
    format: "Notebook",
    title: "Local systems notebook",
    description: "Implementation notes on private inference, routing, observability, and evaluation across small local systems.",
  },
  {
    dateISO: "2026-05-15",
    format: "Design study",
    title: "Interface studies 01",
    description: "Experiments in exposing system state without turning complex software into a wall of controls and dashboards.",
  },
  {
    dateISO: "2026-04-15",
    format: "Working paper",
    title: "Evaluation beyond a single score",
    description: "A framework for comparing reliability, recoverability, latency, and human oversight across agent workflows.",
  },
]

export type ResearchItem = {
  slug?: string
  date: string
  format: string
  category: "research" | "systems" | "design"
  title: string
  description: string
}

export const researchItems: ResearchItem[] = [
  {
    slug: "context-as-infrastructure",
    date: "Jul 2026",
    format: "Research note",
    category: "research",
    title: "Context as infrastructure",
    description: "A practical model for separating task framing, evidence, state, and durable memory in tool-using agent systems.",
  },
  {
    date: "Jun 2026",
    format: "Notebook",
    category: "systems",
    title: "Local systems notebook",
    description: "Implementation notes on private inference, routing, observability, and evaluation across small local systems.",
  },
  {
    date: "May 2026",
    format: "Design study",
    category: "design",
    title: "Interface studies 01",
    description: "Experiments in exposing system state without turning complex software into a wall of controls and dashboards.",
  },
  {
    date: "Apr 2026",
    format: "Working paper",
    category: "research",
    title: "Evaluation beyond a single score",
    description: "A framework for comparing reliability, recoverability, latency, and human oversight across agent workflows.",
  },
]

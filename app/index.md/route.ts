import { getLoopGuide } from "@/lib/loop-docs"
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/seo"

export const dynamic = "force-static"

export function GET() {
  const loop = getLoopGuide()?.published ? "- [Loop reproduction guide](https://luccilabs.xyz/docs/loop)\n" : ""
  return new Response(`# ${SITE_NAME}\n\n${SITE_DESCRIPTION}\n\nCanonical HTML page: ${SITE_URL}\n\nLucci Labs is the research arm of [Lucci](https://luccihq.com).\n\n- [Published research](https://luccilabs.xyz/writing)\n- [Open-source instruments](https://luccilabs.xyz/building)\n${loop}- [Documentation interface preview](https://luccilabs.xyz/docs)\n`, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Link": `<${SITE_URL}>; rel="canonical"`,
      "X-Robots-Tag": "noindex",
    },
  })
}

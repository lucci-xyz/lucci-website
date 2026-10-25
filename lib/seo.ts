import type { Metadata } from "next"

export const SITE_URL = "https://luccilabs.xyz"
export const SITE_NAME = "Lucci Labs"
export const SITE_DESCRIPTION = "Research on intelligent systems: tool-using agents, portable context, local inference, and wearable sensing."

export function pageMetadata(path: string, title: string, description: string): Metadata {
  const url = `${SITE_URL}${path}`
  const fullTitle = path ? `${title} · ${SITE_NAME}` : `${SITE_NAME} · ${title}`
  return {
    title: path ? title : { absolute: fullTitle },
    description,
    alternates: { canonical: url, types: { "application/rss+xml": `${SITE_URL}/feed.xml` } },
    openGraph: {
      title: fullTitle, description, url, siteName: SITE_NAME, locale: "en_US", type: "website",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: ["/og.png"] },
  }
}

export const organizationGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization", "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL, description: SITE_DESCRIPTION, logo: `${SITE_URL}/icon.svg`,
      sameAs: ["https://github.com/lucci-xyz", "https://huggingface.co/luccilabs"],
      contactPoint: { "@type": "ContactPoint", contactType: "inquiries", email: "contact@luccilabs.xyz" },
      parentOrganization: { "@type": "Organization", "@id": "https://luccihq.com/#organization", name: "Lucci", url: "https://luccihq.com" },
    },
    {
      "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: SITE_URL,
      name: SITE_NAME, publisher: { "@id": `${SITE_URL}/#organization` }, inLanguage: "en",
    },
  ],
}

import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <span>© {new Date().getFullYear()} Lucci Labs</span>
      <div className="footer-links">
        <a className="quiet-link" href="mailto:contact@luccilabs.xyz">Contact</a>
        <Link className="quiet-link" href="/privacy">Privacy</Link>
        <Link className="quiet-link" href="/docs">API docs</Link>
        <a className="quiet-link" href="https://github.com/lucci-xyz" target="_blank" rel="noreferrer">GitHub</a>
        <a className="quiet-link" href="https://huggingface.co/luccilabs" target="_blank" rel="noreferrer">Hugging Face</a>
        <a className="quiet-link" href="https://orcid.org/0009-0001-3328-6549" target="_blank" rel="noreferrer">ORCID</a>
        <a className="quiet-link" href="#top">Back to top</a>
      </div>
    </footer>
  )
}

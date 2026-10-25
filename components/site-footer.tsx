import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <span>© {new Date().getFullYear()} Lucci Labs</span>
      <div className="footer-links">
        <a className="quiet-link" href="https://luccihq.com" target="_blank" rel="noreferrer">Lucci HQ</a>
        <a className="quiet-link" href="mailto:contact@luccilabs.xyz">Contact</a>
        <Link className="quiet-link" href="/privacy">Privacy</Link>
        <Link className="quiet-link" href="/docs">API docs</Link>
        <div className="footer-social-links">
          <a className="footer-icon-link" href="https://github.com/lucci-xyz" target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub">
            <img src="/brand-icons/github.svg" width="20" height="20" alt="" aria-hidden="true" />
          </a>
          <a className="footer-icon-link" href="https://huggingface.co/luccilabs" target="_blank" rel="noreferrer" aria-label="Hugging Face" title="Hugging Face">
            <img src="/brand-icons/huggingface.svg" width="20" height="20" alt="" aria-hidden="true" />
          </a>
          <a className="footer-icon-link" href="https://orcid.org/0009-0001-3328-6549" target="_blank" rel="noreferrer" aria-label="ORCID" title="ORCID">
            <img src="/brand-icons/orcid.svg" width="20" height="20" alt="" aria-hidden="true" />
          </a>
        </div>
        <a className="quiet-link" href="#top">Back to top</a>
      </div>
    </footer>
  )
}

import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <span>© {new Date().getFullYear()} Lucci Labs</span>
      <div className="footer-links">
        <Link className="quiet-link" href="/docs">API docs</Link>
        <a className="quiet-link" href="https://github.com/lucci-xyz" target="_blank" rel="noreferrer">GitHub</a>
        <a className="quiet-link" href="#top">Back to top</a>
      </div>
    </footer>
  )
}

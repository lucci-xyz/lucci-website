import Container from './Container'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-black/5">
      <Container>
        <div className="py-10 text-sm text-mute flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Lucci. The economic layer for open source.</p>
          <div className="flex gap-6">
            <a href="https://github.com/LucciCapital" className="hover:text-ink">GitHub</a>
            <a href="/docs" className="hover:text-ink">Docs</a>
          </div>
        </div>
      </Container>
    </footer>
  )
}

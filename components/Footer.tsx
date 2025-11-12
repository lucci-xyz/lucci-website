import Container from './Container'
import Socials from './Socials'

interface FooterProps {
  bgColor?: string
}

export default function Footer({ bgColor = '#83EEE8' }: FooterProps) {
  return (
    <footer className="border-t" style={{ backgroundColor: bgColor, borderColor: 'rgba(0, 130, 123, 0.1)' }}>
      <Container>
        <Socials />
        <div className="py-10 text-sm text-center" style={{ color: '#00827B' }}>
          <p>© {new Date().getFullYear()} Lucci. The economic layer for open source.</p>
        </div>
      </Container>
    </footer>
  )
}

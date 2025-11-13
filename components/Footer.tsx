import Container from './Container'
import Socials from './Socials'
import { COLORS } from '@/lib/constants/theme'
import type { FooterProps } from '@/lib/types'

/**
 * Footer component with social links and copyright
 * @param bgColor - Background color for the footer (defaults to mint background)
 */
export default function Footer({ bgColor = COLORS.backgroundMint }: FooterProps) {
  return (
    <footer className="mt-8 w-full max-w-[100vw]" style={{ backgroundColor: bgColor, borderColor: `${COLORS.primary}1A` }}>
      <Container>
        <div className="py-8 flex flex-col items-center gap-3">
          <Socials />
          <div className="text-sm text-center w-full" style={{ color: COLORS.primary }}>
            <p>© {new Date().getFullYear()} Lucci. The economic layer for open source.</p>
          </div>
        </div>
      </Container>
    </footer>
  )
}

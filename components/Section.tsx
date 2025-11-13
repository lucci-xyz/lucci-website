import { PropsWithChildren } from 'react'

/**
 * Section component that provides consistent vertical spacing
 * Used to create consistent spacing between major page sections
 * 
 * @param children - React children to be wrapped in the section
 */
export default function Section({ children }: PropsWithChildren) {
  return <section style={{ paddingTop: 'var(--section-spacing)', paddingBottom: 'var(--section-spacing)' }}>{children}</section>
}
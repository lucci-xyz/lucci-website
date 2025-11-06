import { PropsWithChildren } from 'react'

export default function Section({ children }: PropsWithChildren) {
  return <section className="py-8 lg:py-12">{children}</section>
}
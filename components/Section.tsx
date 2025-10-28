import { PropsWithChildren } from 'react'

export default function Section({ children }: PropsWithChildren) {
  return <section className="py-16 lg:py-24">{children}</section>
}
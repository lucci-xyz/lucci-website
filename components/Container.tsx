import { PropsWithChildren } from 'react'

/**
 * Container component that provides consistent max-width and padding
 * Used to center content and maintain consistent spacing across pages
 * 
 * @param children - React children to be wrapped in the container
 */
export default function Container({ children }: PropsWithChildren) {
  return <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">{children}</div>
}
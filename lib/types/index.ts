/**
 * Global type definitions for the Lucci website
 */

// Team member types
export interface TeamMember {
  readonly name: string
  readonly email: string
  readonly github: string
  readonly image: string
}

// Social media types
export interface SocialLink {
  name: string
  url: string
  icon: React.ReactNode
}

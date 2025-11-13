/**
 * Global type definitions for the Lucci website
 */

// Navigation types
export interface NavLink {
  href: string
  label: string
}

export interface NavbarProps {
  aboutUsTextColor?: string
}

// Team member types
export interface TeamMember {
  readonly name: string
  readonly email: string
  readonly github: string
}

// Product types
export interface ProductLink {
  label: string
  url: string
}

export interface Product {
  name: string
  blurb: string
  tags: string[]
  status: string
  links: ProductLink[]
}

// Social media types
export interface SocialLink {
  name: string
  url: string
  icon: React.ReactNode
}

// Documentation types
export interface DocLink {
  label: string
  href: string
}

export interface DocSection {
  title: string
  links: DocLink[]
}

// Component prop types
export interface FooterProps {
  bgColor?: string
}

export interface BrowserMockupProps {
  url?: string
  children?: React.ReactNode
}

export interface ProductCardProps {
  name: string
  blurb: string
  tags: string[]
  status: string
  href?: string
  links?: ProductLink[]
}

// Notification types (for PhoneNotification component)
export interface NotificationData {
  from: string
  amount: string
  detail: string
  platform: string
  bgColor: string
  icon: string
  needsPadding: boolean
  iconSize: string
}

// Timeline activity types (for PilotTimeline component)
export interface TimelineActivity {
  title: string
  detail: string
  iconBg: string
  iconSvg: React.ReactNode
  time: string
}

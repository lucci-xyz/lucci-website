# Lucci Website

The official website for Lucci - The Economic Layer for Open Source.

## 🏗️ Project Structure

```
lucci-website/
├── app/                    # Next.js App Router pages
│   ├── Work/          # Work showcase page
│   ├── team/              # Team page
│   ├── globals.css        # Global styles and animations
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Homepage
├── components/            # Reusable React components
│   ├── Container.tsx      # Layout container with max-width
│   ├── Footer.tsx         # Site footer with social links
│   ├── Navbar.tsx         # Main navigation component
│   ├── PhoneNotification.tsx  # Animated notification demo
│   ├── PilotTimeline.tsx  # Animated timeline demo
│   ├── ScrollAnimations.tsx   # Scroll-triggered animations
│   ├── Section.tsx        # Section wrapper with spacing
│   └── Socials.tsx        # Social media links
├── lib/                   # Utilities and configuration
│   ├── constants/         # Design system and configuration
│   │   ├── navigation.ts  # Navigation structure
│   │   ├── social.tsx     # Social media links
│   │   └── theme.ts       # Design tokens and colors
│   ├── data/              # Static data and content
│   │   ├── notifications.ts   # Mock notification data
│   │   ├── Work.ts    # Product information
│   │   ├── team.ts        # Team member information
│   │   └── timeline.tsx   # Mock timeline activities
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts       # Global type definitions
│   └── utils/             # Utility functions
│       └── index.ts       # Utility functions
└── public/                # Static assets
    ├── ethereum.svg       # Ethereum logo
    ├── mezo.svg          # Mezo logo
    ├── og.png            # Open Graph image
    └── uniswap.svg       # Uniswap logo
```

## 🎨 Design System

The project uses a centralized design system located in `lib/constants/theme.ts`:

### Colors
- **Primary**: `#00827B` (Teal)
- **Background Mint**: `#83EEE8` (Light mint)
- **Background Light**: `#D4F6F4` (Very light mint)
- **Text colors**: Various shades for hierarchy

### Typography
- **Font Family**: Inter (sans-serif), Georgia (serif for special cases)
- **Font Sizes**: Responsive scale from xs to 7xl

### Spacing & Layout
- **Container**: Max-width of 7xl with responsive padding
- **Sections**: Consistent vertical spacing (py-8 lg:py-12)
- **Border Radius**: Consistent rounded corners

## 🧩 Components

### Layout Components
- **Container**: Provides consistent max-width and horizontal padding
- **Section**: Adds consistent vertical spacing between content sections
- **Navbar**: Responsive navigation with mobile hamburger menu
- **Footer**: Site footer with social links and copyright

### Interactive Components
- **PhoneNotification**: Animated notification carousel showing payment demos
- **PilotTimeline**: Animated timeline showing AI agent activities
- **ScrollAnimations**: Intersection observer for scroll-triggered animations
- **Socials**: Social media links with icons

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎭 Animations

### CSS Animations (in globals.css)
- `animate-fade-in-up`: Fade in with upward motion
- `animate-slide-up`: Slide up from bottom
- `animate-float-glow`: Floating animation with glow effect
- `animate-slide-in-left/right`: Slide in from sides

### Scroll Animations
- Elements with `animate-on-scroll` class trigger when entering viewport
- Managed by `ScrollAnimations` component using Intersection Observer

## 🛠️ Development

### Getting Started
```bash
npm install
npm run dev
```

### Key Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

### Code Organization
- **Types**: All TypeScript interfaces in `lib/types/`
- **Constants**: Design tokens and configuration in `lib/constants/`
- **Data**: Static content in `lib/data/`
- **Components**: Reusable UI components with JSDoc documentation

## 📄 Pages

### Homepage (`/`)
- Hero section with main value proposition
- Animated product showcase
- Mint green theme with floating logo

### Work (`/Work`)
- Detailed product information
- Interactive demos (notifications, timeline)
- BountyPay and Pilot product cards

### Team (`/team`)
- Team member profiles
- Contact information
- Clean white theme

## 🎯 Key Features

1. **Responsive Design**: Mobile-first approach with Tailwind CSS
2. **Smooth Animations**: CSS animations and scroll-triggered effects
3. **Type Safety**: Comprehensive TypeScript types
4. **Design System**: Centralized theme tokens and reusable styles
5. **Performance**: Next.js App Router with optimized images
6. **Accessibility**: Semantic HTML and ARIA labels

## 🔧 Technical Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom animations
- **Language**: TypeScript
- **Icons**: Custom SVG icons
- **Deployment**: Optimized for Vercel

## 📝 Content Management

- **Team Data**: Managed in `lib/data/team.ts`
- **Work**: Managed in `lib/data/Work.ts`
- **Notifications**: Mock data in `lib/data/notifications.ts`
- **Timeline**: Mock data in `lib/data/timeline.tsx`
- **Navigation**: Configured in `lib/constants/navigation.ts`
- **Social Links**: Managed in `lib/constants/social.tsx`

## 🚀 Deployment

The site is optimized for deployment on Vercel with:
- Static generation for optimal performance
- Image optimization
- Automatic font optimization
- Edge runtime support

---

Built with ❤️ by the Lucci team

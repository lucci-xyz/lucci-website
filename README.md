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
│   ├── custom-cursor.tsx  # Custom cursor component
│   ├── grain-overlay.tsx  # Grain texture overlay
│   ├── magnetic-button.tsx # Magnetic button interaction
│   └── sections/          # Page sections
│       ├── about-section.tsx
│       ├── capabilities-section.tsx
│       ├── contact-section.tsx
│       ├── products-section.tsx
│       └── team-section.tsx
├── hooks/                 # React hooks
│   └── use-reveal.ts      # Scroll reveal hook
├── lib/                   # Utilities and configuration
│   ├── constants/         # Configuration
│   │   └── social.tsx     # Social media links
│   ├── data/              # Static data and content
│   │   └── team.ts        # Team member information
│   └── types/             # TypeScript type definitions
│       └── index.ts       # Global type definitions
└── public/                # Static assets
    ├── nat-profile.png    # Team member photo
    ├── og.png            # Open Graph image
    └── preston-profile.jpg # Team member photo
```

## 🎨 Design System

The project uses Tailwind CSS with custom CSS variables defined in `app/globals.css`:

### Colors
- Uses CSS custom properties (oklch color space) for theming
- Accent color: Teal (`oklch(0.72 0.10 175)`)
- Dark background theme with high contrast

### Typography
- **Font Family**: Geist Sans (primary), Geist Mono (monospace)
- Responsive typography using Tailwind utilities

## 🧩 Components

### Core Components
- **CustomCursor**: Custom cursor with magnetic effect
- **GrainOverlay**: Subtle grain texture overlay
- **MagneticButton**: Button with magnetic hover effect

### Section Components
- **AboutSection**: Company information and stats
- **CapabilitiesSection**: Focus areas and capabilities
- **ContactSection**: Contact form and information
- **ProductsSection**: Featured work/products
- **TeamSection**: Team member profiles

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎭 Animations

### CSS Animations (in globals.css)
- `animate-in`: Base animation utility
- `fade-in`: Fade in animation
- `slide-in-from-bottom-4/8`: Slide up animations
- Delay utilities: `delay-100` through `delay-500`

### Scroll Animations
- Uses `use-reveal` hook for scroll-triggered animations
- Components reveal when entering viewport with smooth transitions

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
- **Constants**: Configuration in `lib/constants/`
- **Data**: Static content in `lib/data/`
- **Components**: Reusable UI components organized by feature
- **Hooks**: Custom React hooks in `hooks/`

## 📄 Pages

### Homepage (`/`)
- Horizontal scroll sections with shader background
- Hero section with main value proposition
- Featured work/products section
- Capabilities/focus section
- About section with stats
- Contact section with form

### Products (`/products`)
- Featured work showcase
- BountyPay, Pilot, and Orbit products
- Stair-step layout design

### Team (`/team`)
- Team member profiles
- Contact form
- Dark theme with gradient background

### Team (`/team`)
- Team member profiles
- Contact information
- Clean white theme

## 🎯 Key Features

1. **Responsive Design**: Mobile-first approach with Tailwind CSS
2. **Smooth Animations**: CSS animations and scroll-triggered reveal effects
3. **Type Safety**: Comprehensive TypeScript types
4. **Custom Cursor**: Interactive cursor with magnetic effects
5. **Shader Backgrounds**: Dynamic shader effects using shaders/react
6. **Performance**: Next.js App Router with optimized images
7. **Accessibility**: Semantic HTML and ARIA labels

## 🔧 Technical Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom animations
- **Language**: TypeScript
- **Icons**: Custom SVG icons
- **Deployment**: Optimized for Vercel

## 📝 Content Management

- **Team Data**: Managed in `lib/data/team.ts`
- **Social Links**: Managed in `lib/constants/social.tsx`
- **Product Data**: Hardcoded in component files (products-section.tsx, products/page.tsx)

## 🚀 Deployment

The site is optimized for deployment on Vercel with:
- Static generation for optimal performance
- Image optimization
- Automatic font optimization
- Edge runtime support

---

Built with ❤️ by the Lucci team

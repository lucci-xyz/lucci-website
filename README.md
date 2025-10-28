# Lucci Labs Website

A production-grade marketing site for Lucci Labs—a blockchain/Web3/DeFi R&D collective. Built with Next.js 14, Tailwind CSS, and shadcn/ui.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Format code
npm run format
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## 🏗️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS v4 with CSS variables
- **UI Components:** shadcn/ui
- **Icons:** lucide-react
- **Typography:** Inter (via next/font/google)
- **Dark Mode:** next-themes
- **Content:** MDX for blog posts and research
- **Testing:** Vitest + React Testing Library
- **Linting:** ESLint (next/core-web-vitals)
- **Formatting:** Prettier

## 📁 Project Structure

```
lucci-website/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Home page
│   ├── projects/          # Projects page
│   ├── research/          # Research blog
│   │   └── [slug]/       # Individual research posts
│   ├── about/            # About page
│   ├── contact/          # Contact page
│   ├── api/              # API routes
│   │   └── github/       # GitHub repo data fetcher
│   └── opengraph-image.tsx # OG image generation
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── navbar.tsx        # Navigation bar
│   ├── footer.tsx        # Footer
│   ├── hero.tsx          # Hero section
│   ├── project-card.tsx  # Project card component
│   ├── section.tsx       # Section wrapper
│   ├── callout.tsx       # Callout/alert component
│   └── theme-toggle.tsx  # Dark/light mode toggle
├── lib/                   # Utility functions
│   ├── utils.ts          # General utilities
│   ├── github.ts         # GitHub API helpers
│   ├── mdx.ts            # MDX content helpers
│   ├── projects.ts       # Projects data helpers
│   └── types.ts          # TypeScript types
├── data/                  # Static data
│   └── projects.json     # Projects database
├── content/              # MDX content
│   └── research/         # Research posts
├── public/               # Static assets
│   ├── lucci.svg        # Wordmark logo
│   └── logo.svg         # Icon logo
├── __tests__/            # Test files
└── ...config files
```

## 📝 Content Management

### Adding a Project

Edit `data/projects.json`:

```json
{
  "name": "ProjectName",
  "blurb": "Short description of the project.",
  "tags": ["tag1", "tag2", "tag3"],
  "status": "alpha",
  "githubUrl": "https://github.com/LucciCapital/repo-name",
  "siteUrl": "https://example.com"
}
```

**Status options:** `alpha`, `experimental`, `archived`

### Adding a Research Post

Create a new `.mdx` file in `content/research/`:

```mdx
---
title: "Your Post Title"
date: "2025-10-27"
summary: "A brief summary of the post."
tags: ["tag1", "tag2"]
---

# Your Post Title

Your content here in Markdown/MDX format...
```

The post will automatically appear on `/research` and be accessible at `/research/your-filename`.

## 🎨 Styling & Theming

The site uses CSS variables for theming, defined in `app/globals.css`. Both light and dark modes are fully supported.

### Key Design Principles

- **Clean & Minimal:** Generous whitespace, clear hierarchy
- **Typography:** Inter font, 1.125–1.25 line height
- **Motion:** Subtle transitions and hover effects
- **Accessibility:** Keyboard navigation, ARIA labels, semantic HTML

### Color Palette

- Light mode: White/soft gray base, muted blues
- Dark mode: Deep gray base, subtle contrast
- Accents: Minimal, intentional use of color

## 🧪 Testing

The project includes tests for critical components:

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui
```

Tests are located in `__tests__/` and cover:
- ThemeToggle component
- Section component

Add more tests as needed following the same pattern.

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel will auto-detect Next.js and deploy

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

### Environment Variables

No environment variables are required for basic functionality. For GitHub API rate limiting, optionally add:

```env
GITHUB_TOKEN=your_github_personal_access_token
```

## 🔧 Configuration Files

- `next.config.ts` - Next.js configuration with MDX support
- `tailwind.config.ts` - Tailwind CSS configuration
- `components.json` - shadcn/ui configuration
- `tsconfig.json` - TypeScript configuration
- `vitest.config.ts` - Vitest test configuration
- `.prettierrc` - Prettier formatting rules
- `eslint.config.mjs` - ESLint rules

## 📊 Performance

The site is optimized for performance:

- **Lighthouse Score Target:** ≥95
- **CLS (Cumulative Layout Shift):** <0.03
- **Image Optimization:** Next.js Image component
- **Font Optimization:** next/font with Inter
- **Static Generation:** Most pages are statically generated
- **API Route Caching:** GitHub data cached for 1 hour

## 🎯 Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark/light mode with system preference detection
- ✅ MDX blog with frontmatter
- ✅ GitHub repo integration (stars, last updated)
- ✅ Project filtering by tags
- ✅ SEO optimized with metadata API
- ✅ OpenGraph image generation
- ✅ Accessible (keyboard navigation, ARIA)
- ✅ Type-safe with TypeScript
- ✅ Component tests with Vitest

## 🐛 Known Issues / TODOs

- Contact form is a placeholder (needs backend integration)
- GitHub API has rate limits (add token for higher limits)
- Some projects may not have live site URLs

## 🤝 Contributing

This is an open-source project. Contributions welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🔗 Links

- **Website:** https://luccilabs.com
- **GitHub:** https://github.com/LucciCapital
- **Twitter:** https://twitter.com/luccilabs

---

Built with ❤️ by Lucci Labs. Code can (and will) break.

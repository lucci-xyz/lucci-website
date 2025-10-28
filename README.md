# Lucci Labs Website

A modern, sleek landing page for Lucci Labs - a blockchain R&D collective exploring the edges of Web3, DeFi, and cryptography.

## 🚀 Overview

Lucci Labs is an experimental, open-source playground where innovation moves faster than perfection. This website showcases our research, projects, and ecosystem partnerships with a design inspired by leading Web3 platforms.

## 🎨 Design Philosophy

- **Clean & Professional**: Minimalist interface with thoughtful use of space
- **Future-Forward**: Modern animations and interactions
- **Performance-First**: Optimized for speed and accessibility
- **Responsive**: Beautiful on all devices

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion & CSS animations
- **Icons**: Lucide React
- **Font**: Inter (primary), JetBrains Mono (code)

## 📁 Project Structure

```
lucci-website/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/
│   ├── Header.tsx       # Navigation header
│   ├── Hero.tsx         # Hero section
│   ├── Research.tsx     # Research areas
│   ├── Projects.tsx     # Live projects showcase
│   ├── Partners.tsx     # Ecosystem partners
│   ├── Newsletter.tsx   # Email subscription
│   └── Footer.tsx       # Site footer
├── lib/
│   └── utils.ts        # Utility functions
└── public/             # Static assets
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/luccilabs/lucci-website.git
cd lucci-website
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

## 🎯 Features

- **Responsive Navigation**: Mobile-friendly header with smooth scroll
- **Hero Section**: Eye-catching landing with animated elements
- **Research Showcase**: Grid layout highlighting our R&D areas
- **Project Cards**: Interactive project displays with live stats
- **Partner Ecosystem**: Testimonials and partner showcase
- **Newsletter Signup**: Email subscription with validation
- **Glass Morphism**: Modern glass effects throughout
- **Gradient Animations**: Dynamic color transitions
- **Dark Mode**: Elegant dark theme by default

## 🎨 Customization

### Colors

Edit the color palette in `tailwind.config.ts`:

```typescript
colors: {
  lucci: {
    // Purple shades
    500: '#6b3cff',
    600: '#5a1fff',
    // ...
  },
  accent: {
    cyan: '#00d4ff',
    lime: '#a8ff00',
    // ...
  }
}
```

### Content

Update content in the respective component files:
- Research areas: `components/Research.tsx`
- Projects: `components/Projects.tsx`
- Partners: `components/Partners.tsx`

## 📄 License

MIT License - feel free to use this code for your own projects!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or collaborations, reach out to: hello@luccilabs.com

---

Built with ❤️ by the Lucci Labs team in San Francisco & New York City
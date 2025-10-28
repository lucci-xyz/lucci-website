import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.json',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6D8AFF',
          50: '#F2F5FF',
          100: '#E6EBFF',
          200: '#C0CCFF',
          300: '#99ADFF',
          400: '#738FFF',
          500: '#6D8AFF',
          600: '#4A69E6',
          700: '#3A53B4',
          800: '#2A3D82',
          900: '#1A2750'
        },
        ink: '#0A0A0A',
        mute: '#6B7280'
      },
      backgroundImage: {
        'hero-gradient':
          'radial-gradient(1200px 600px at 80% -10%, rgba(109,138,255,0.20), transparent), radial-gradient(800px 400px at 10% 0%, rgba(176,132,255,0.18), transparent)'
      },
      borderRadius: { xl: '0.75rem', '2xl': '1rem' }
    }
  },
  plugins: []
} satisfies Config

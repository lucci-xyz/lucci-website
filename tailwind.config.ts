import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
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
        bounty: {
          DEFAULT: '#1F807B',
          light: '#63BBB6',
          lighter: '#9DEBE7',
          50: '#F0FFFE',
          100: '#CCFFF8',
          200: '#9DEBE7',
          300: '#63BBB6',
          400: '#3D9D98',
          500: '#1F807B',
          600: '#186662',
          700: '#124D4A',
          800: '#0C3533',
          900: '#061E1C'
        },
        ink: '#0A0A0A',
        mute: '#6B7280'
      },
      backgroundImage: {
        'hero-gradient':
          'radial-gradient(1200px 600px at 80% -10%, rgba(109,138,255,0.20), transparent), radial-gradient(800px 400px at 10% 0%, rgba(176,132,255,0.18), transparent)'
      },
      borderRadius: { xl: '0.75rem', '2xl': '1rem' },
      spacing: {
        'fluid-xs': 'clamp(0.25rem, 0.5vw, 0.5rem)',
        'fluid-sm': 'clamp(0.5rem, 1vw, 1rem)',
        'fluid-md': 'clamp(1rem, 2vw, 2rem)',
        'fluid-lg': 'clamp(1.5rem, 3vw, 3rem)',
        'fluid-xl': 'clamp(2rem, 4vw, 4rem)',
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
} satisfies Config

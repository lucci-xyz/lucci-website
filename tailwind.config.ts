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
        bounty: {
          '50': '#F0FFFE',
          '100': '#CCFFF8',
          '200': '#9DEBE7',
          '300': '#63BBB6',
          '400': '#3D9D98',
          '500': '#1F807B',
          '600': '#186662',
          '700': '#124D4A',
          '800': '#0C3533',
          '900': '#061E1C',
          DEFAULT: '#1F807B',
          light: '#63BBB6',
          lighter: '#9DEBE7'
        },
        ink: '#0A0A0A',
        mute: '#6B7280',
      },
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
      },
    }
  },
} satisfies Config

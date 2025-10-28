import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary purple palette
        purple: {
          50: '#E2E0FF',
          100: '#BDBBFF',
          200: '#9896FF',
          300: '#7A77FF',
          400: '#5C58FF',
          500: '#3E39FF',
          600: '#2A25E6',
          700: '#1F1ACC',
          800: '#1510B3',
          900: '#0B0699',
        },
        // Greenish-blue palette
        teal: {
          50: '#83EEE8',
          100: '#39BEB7',
          200: '#00827B',
          300: '#006B65',
          400: '#00544F',
          500: '#003D39',
          600: '#002623',
          700: '#001F1D',
          800: '#001817',
          900: '#001111',
        },
        // Yellow palette
        yellow: {
          50: '#FFF7A5',
          100: '#FFD400',
          200: '#FFB400',
          300: '#E6A200',
          400: '#CC9000',
          500: '#B37E00',
          600: '#996C00',
          700: '#805A00',
          800: '#664800',
          900: '#4D3600',
        },
        // Blue palette
        blue: {
          50: '#96E9FF',
          100: '#00AEFF',
          200: '#008AFF',
          300: '#0078E6',
          400: '#0066CC',
          500: '#0054B3',
          600: '#004299',
          700: '#003080',
          800: '#001E66',
          900: '#000C4D',
        },
        // Reddish-orange palette
        orange: {
          50: '#FFC38B',
          100: '#FF8130',
          200: '#FF3200',
          300: '#E62B00',
          400: '#CC2500',
          500: '#B31F00',
          600: '#991900',
          700: '#801300',
          800: '#660D00',
          900: '#4D0A00',
        },
        // Light blue palette
        sky: {
          50: '#D9F7FF',
          100: '#A7E9FD',
          200: '#39D1F9',
          300: '#33B8E0',
          400: '#2D9FC7',
          500: '#2786AE',
          600: '#216D95',
          700: '#1B547C',
          800: '#153B63',
          900: '#0F224A',
        },
        // Dark blue palette
        navy: {
          50: '#A7D4FF',
          100: '#5589C5',
          200: '#00498B',
          300: '#00417A',
          400: '#003969',
          500: '#003158',
          600: '#002947',
          700: '#002136',
          800: '#001925',
          900: '#001114',
        },
        // Neutral palette (light mode)
        neutral: {
          50: '#FFFFFF',
          100: '#F8F8F8',
          200: '#E6E6E6',
          300: '#D1D1D1',
          400: '#B0B0B0',
          500: '#847E7E',
          600: '#6B6565',
          700: '#524C4C',
          800: '#393333',
          900: '#211D1D',
          950: '#0F0B0B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Roboto Mono', 'monospace'],
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh': 'linear-gradient(45deg, #9896FF 0%, #39BEB7 25%, #FFB400 50%, #008AFF 75%, #FF3200 100%)',
        'gradient-primary': 'linear-gradient(135deg, #9896FF 0%, #BDBBFF 50%, #E2E0FF 100%)',
        'gradient-teal': 'linear-gradient(135deg, #00827B 0%, #39BEB7 50%, #83EEE8 100%)',
        'gradient-yellow': 'linear-gradient(135deg, #FFB400 0%, #FFD400 50%, #FFF7A5 100%)',
        'gradient-blue': 'linear-gradient(135deg, #008AFF 0%, #00AEFF 50%, #96E9FF 100%)',
        'gradient-orange': 'linear-gradient(135deg, #FF3200 0%, #FF8130 50%, #FFC38B 100%)',
        'gradient-sky': 'linear-gradient(135deg, #39D1F9 0%, #A7E9FD 50%, #D9F7FF 100%)',
        'gradient-navy': 'linear-gradient(135deg, #00498B 0%, #5589C5 50%, #A7D4FF 100%)',
      },
    },
  },
  plugins: [],
}
export default config

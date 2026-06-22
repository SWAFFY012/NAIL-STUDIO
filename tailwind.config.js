/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        noir: {
          950: '#0a0807',
          900: '#100c0b',
          850: '#16100e',
          800: '#1d1613',
          700: '#2a201c',
          600: '#3a2c26',
        },
        rose: {
          nude: '#c9a79a',
          mauve: '#a87f78',
          deep: '#8c5d57',
        },
        champagne: {
          DEFAULT: '#d9bd9c',
          light: '#ecdcc4',
          dark: '#b8966e',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        luxe: '0.35em',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        shimmer: 'shimmer 6s linear infinite',
        floaty: 'floaty 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

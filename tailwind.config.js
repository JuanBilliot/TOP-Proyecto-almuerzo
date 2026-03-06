/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          pink: '#FFE0EC',
          purple: '#E8D5F2',
          blue: '#D5E8F7',
          mint: '#D5F2E8',
          peach: '#FFE8D5',
          lavender: '#E6E0F0',
          rose: '#FFE0E6',
          sky: '#E0F2FE',
          sage: '#E8F5E8',
          cream: '#FFF8E7',
        },
        primary: {
          50: '#FEF7F0',
          100: '#FDEDD9',
          200: '#FAD9AE',
          300: '#F6C27D',
          400: '#F1A646',
          500: '#EC8B2A',
          600: '#D9741F',
          700: '#B45D18',
          800: '#8F4A1C',
          900: '#733E1C',
        }
      },
      fontFamily: {
        elegant: ['Georgia', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'soft-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}

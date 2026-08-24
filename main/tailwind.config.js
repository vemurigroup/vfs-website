export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F46E5',
          50: '#EBEAFE',
          100: '#D9D7FD',
          200: '#B6B1FB',
          300: '#928BF9',
          400: '#6F65F7',
          500: '#4F46E5',
          600: '#2B22C9',
          700: '#211A97',
          800: '#161265',
          900: '#0B0A33',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

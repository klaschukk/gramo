/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/renderer/**/*.{ts,tsx,html}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light mode: Cyan + Green (palette C)
        primary: {
          DEFAULT: '#0891B2',
          light: '#22D3EE',
          dark: '#0E7490',
          50: '#ECFEFF',
          100: '#CFFAFE',
          200: '#A5F3FC',
          500: '#06B6D4',
          600: '#0891B2',
          700: '#0E7490',
          900: '#164E63',
        },
        accent: {
          DEFAULT: '#059669',
          light: '#34D399',
          50: '#ECFDF5',
          100: '#D1FAE5',
          500: '#10B981',
          600: '#059669',
        },
        surface: {
          DEFAULT: '#ECFEFF',
          card: '#FFFFFF',
          muted: '#F0FDFA',
        },
        ink: {
          DEFAULT: '#164E63',
          muted: '#5E8A97',
          faint: '#A0C4CE',
        },
        // Dark mode colors via CSS variables in globals.css
      },
      fontFamily: {
        heading: ['Poppins', 'system-ui', 'sans-serif'],
        body: ['Open Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '10px',
      },
    },
  },
  plugins: [],
}

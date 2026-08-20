/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          950: '#0d3112',
          900: '#144517',
          800: '#1b5e20',
          700: '#2e7d32',
          600: '#388e3c',
          100: '#dff1df',
          50: '#f3f9f1',
        },
        workspace: '#f4f7f2',
        ink: '#1a1c19',
        muted: '#737a72',
        line: '#e0e5df',
      },
      boxShadow: {
        card: '0 4px 14px rgba(20, 69, 23, 0.06)',
        dialog: '0 24px 70px rgba(13, 49, 18, 0.22)',
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

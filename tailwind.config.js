/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // 'class' strategy: dark mode via .dark class on <html>
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        syne:    ['Syne', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      colors: {
        // ── RGB-tuple CSS vars so Tailwind opacity modifiers work (/10, /80 etc)
        bg: {
          primary:   'rgb(var(--bg-primary)   / <alpha-value>)',
          secondary: 'rgb(var(--bg-secondary) / <alpha-value>)',
          card:      'rgb(var(--bg-card)      / <alpha-value>)',
        },
        accent: {
          cyan:    'rgb(var(--accent-cyan)    / <alpha-value>)',
          violet:  'rgb(var(--accent-violet)  / <alpha-value>)',
          emerald: 'rgb(var(--accent-emerald) / <alpha-value>)',
        },
        surface: {
          DEFAULT: 'var(--surface)',
          hover:   'var(--surface-hover)',
          border:  'var(--surface-border)',
        },
        text: {
          primary:   'rgb(var(--text-primary)   / <alpha-value>)',
          secondary: 'rgb(var(--text-secondary) / <alpha-value>)',
          muted:     'rgb(var(--text-muted)     / <alpha-value>)',
        },
      },
      backgroundImage: {
        'gradient-radial':  'radial-gradient(var(--tw-gradient-stops))',
        'glow-cyan':    'radial-gradient(ellipse at center, rgba(0,212,255,0.15) 0%, transparent 70%)',
        'glow-violet':  'radial-gradient(ellipse at center, rgba(124,58,237,0.15) 0%, transparent 70%)',
      },
      animation: {
        'float':          'float 6s ease-in-out infinite',
        'pulse-slow':     'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow':      'spin 20s linear infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'ping-slow':      'ping 2.5s cubic-bezier(0,0,0.2,1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
      },
      boxShadow: {
        'glow-cyan':   '0 0 40px rgba(0,212,255,0.15)',
        'glow-violet': '0 0 40px rgba(124,58,237,0.2)',
        'card':        '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
      },
    },
  },
  plugins: [],
}

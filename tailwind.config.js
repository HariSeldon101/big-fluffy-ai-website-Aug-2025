/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        foreground: '#ffffff',
        card: '#1a1a1a',
        'muted-foreground': '#9ca3af',
        primary: {
          50: '#faf7ff',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          900: '#4c1d95',
        },
        accent: {
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        'light-blue': {
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
        },
        'soft-pink': {
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
        },
        'light-grey': '#d1d5db',
        'dark-grey': '#6b7280'
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
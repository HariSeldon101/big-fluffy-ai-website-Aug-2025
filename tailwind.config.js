/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    // Service icon gradients
    'from-blue-500', 'to-cyan-500',
    'from-purple-500', 'to-soft-pink-500', 'to-pink-500',
    'from-purple-600', 'to-purple-700',
    'from-light-blue-500', 'to-light-blue-600',
    'from-indigo-500', 'to-purple-500',
    'from-slate-500', 'to-slate-600',
    'from-green-500', 'to-emerald-500',
    // Gradient classes
    'bg-gradient-to-br',
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
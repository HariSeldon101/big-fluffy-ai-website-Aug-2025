/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    // Complete gradient classes for service icons
    'bg-gradient-to-br',
    'from-blue-400', 'to-cyan-400',
    'from-purple-400', 'to-pink-400', 
    'from-purple-500', 'to-indigo-600',
    'from-sky-400', 'to-blue-500',
    'from-indigo-400', 'to-purple-400',
    'from-gray-400', 'to-gray-600',
    // Complete service gradient classes
    'bg-gradient-to-br from-blue-400 to-cyan-400',
    'bg-gradient-to-br from-purple-400 to-pink-400',
    'bg-gradient-to-br from-purple-500 to-indigo-600', 
    'bg-gradient-to-br from-sky-400 to-blue-500',
    'bg-gradient-to-br from-indigo-400 to-purple-400',
    'bg-gradient-to-br from-gray-400 to-gray-600',
    // Dashboard gradients
    'from-green-500', 'to-emerald-500',
    'from-primary-500', 'to-primary-600',
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
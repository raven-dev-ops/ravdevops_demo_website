// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Crucial: Points to your template files
  ],
  theme: {
    extend: {
      colors: {
        'raven-navy': '#050B10',
        'raven-card': '#0B1220',
        'raven-surface': '#111827',
        'raven-accent': '#22C55E',
        'raven-cyan': '#06B6D4',
        'raven-amber': '#F59E0B',
        'raven-border': '#1F2937',
      },
      boxShadow: {
        'soft-glow': '0 10px 40px rgba(6, 182, 212, 0.15)',
      },
    },
  },
  plugins: [],
};

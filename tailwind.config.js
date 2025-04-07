// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Crucial: Points to your template files
  ],
  theme: {
    extend: {
      // Your custom theme extensions (like colors) go here
      colors: {
        'raven-blue': '#1E3A8A',
        'raven-red': '#DC2626',
        'raven-light': '#F3F4F6',
        'raven-dark': '#111827',
      },
    },
  },
  plugins: [],
}
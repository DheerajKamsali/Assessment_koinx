/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 0 1px rgba(59, 130, 246, 0.25), 0 30px 80px rgba(2, 6, 23, 0.55)',
      },
      backgroundImage: {
        'radial-dots':
          'radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.14) 1px, transparent 0)',
      },
    },
  },
  plugins: [],
}
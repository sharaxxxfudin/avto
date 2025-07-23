/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}', 
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',       // Добавь если используешь папку pages
  ],
  theme: {
    extend: {
      fontFamily: {
        'druk-sans': ['druk', 'sans-serif'],
      },
    },
  },
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#d9edff',
          200: '#b8dbff',
          300: '#85c2ff',
          400: '#4a9cff',
          500: '#1f7bff',
          600: '#195fe6',
          700: '#164dbf',
          800: '#153d94',
          900: '#142f72',
        },
      },
      boxShadow: {
        soft: '0 12px 28px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
}

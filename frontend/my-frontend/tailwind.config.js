/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/app/**/*.{ts,tsx,js,jsx}',
    './src/components/**/*.{ts,tsx,js,jsx}',
    './app/**/*.{ts,tsx,js,jsx}',
    './pages/**/*.{ts,tsx,js,jsx}'
  ],
  theme: {
    extend: {
      boxShadow: {
        card: '0 10px 30px rgba(16, 24, 40, 0.08)',
      },
      backgroundImage: {
        'red-gradient': 'linear-gradient(90deg,#ff4d4f 0%, #ff2d55 100%)',
      },
      colors: {
        xlm: '#ff4d4f'
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        qcu: {
          primary: '#1444E1',
          secondary: '#374FA1',
          deep: '#394261',
          bronze: '#E0AA14',
          accent: '#95A1AD',
          dark: '#0A0C10',
          gray: {
            900: '#0A0C10',
            800: '#424345',
            600: '#7D7E80',
            400: '#B9B9B9',
            200: '#D8D8D8',
            50: '#FFFFFF'
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
      }
    },
  },
  plugins: [],
};

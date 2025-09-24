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
          bronze: '#FFFFFF',
          accent: '#FFFFFF',
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
        cinzel: ['Cinzel', 'serif'],
        merriweather: ['Merriweather', 'serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      }
    },
  },
  plugins: [],
};

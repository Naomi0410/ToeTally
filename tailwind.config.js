/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        "font-family-1": ["Orbitron Variable", "sans-serif"],
        "font-family-2": ["Alexandria Variable", "sans-serif"],
        "font-family-3": ["Anton", "sans-serif"],
        "font-family-4": ["Antonio Variable", "sans-serif"],
        "font-family-5": ["Averia Serif Libre", "sans-serif"]
      },
      colors: {
        customGray: '#323232',
        customLightGray: '#888888',
        customDarkBlue: '#01497C',
        customVeryDarkBlue: '#021B2D',
        navIcon: '#292D32',
        cardBg: '#B5B5B51A'
      },
      keyframes: {
        moveLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        scrollLeftSmall: {
          '0%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(0)' }, 
          '30%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(-100%)' }, 
          '60%': { transform: 'translateX(-200%)' },
          '80%': { transform: 'translateX(-200%)' }, 
          '90%': { transform: 'translateX(-300%)' },
          '95%': { transform: 'translateX(-300%)' }, 
          '100%': { transform: 'translateX(0)' }, 
        },
        scrollLeftLarge: {
          '0%': { transform: 'translateX(0)' },
          '40%': { transform: 'translateX(-100%)' },
          '60%': { transform: 'translateX(-100%)' },
          '80%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(0)' },
        },
        zoomInOut: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
      },
      animation: {
        moveLeft: 'moveLeft 10s linear infinite',
        scrollLeftSmall: 'scrollLeftSmall 10s linear infinite',
        scrollLeftLarge: 'scrollLeftLarge 10s linear infinite',
        zoomInOut: 'zoomInOut 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

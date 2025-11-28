/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "font-family-1": ["Orbitron Variable", "sans-serif"],
        "font-family-2": ["Alexandria Variable", "sans-serif"],
        "font-family-3": ["Anton", "sans-serif"],
        "font-family-4": ["Antonio Variable", "sans-serif"],
        "font-family-5": ["Averia Serif Libre", "sans-serif"],
      },
      colors: {
        customGray: "#323232",
        customLightGray: "#888888",
        customDarkBlue: "#01497C",
        customVeryDarkBlue: "#021B2D",
        navIcon: "#292D32",
        cardBg: "#B5B5B51A",
      },
    },
  },
  plugins: [],
};

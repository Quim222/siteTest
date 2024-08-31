/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orangeBackground: '#ff3131',
        custom: '#CCCCCC',
        gray1: "#f5f5f5",
        gray2: "#eaeaea",
      },
      screens:{
        sx: '575px',
        lx: '1024px',
        zx: '412px',
        mi: '885px',
        fo: '794px',
        ca: '770px',
      },
      borderWidth:{
        1: '1px',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        popins: ['Poppins', 'sans-serif'],
      },
      keyframes: {
        bounceOnce: {
          '0%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
          '100%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
        },
      },
      animation: {
        'bounce-once': 'bounceOnce 1s ease-in-out 1',
      },
    },
  },
  plugins: [],
}


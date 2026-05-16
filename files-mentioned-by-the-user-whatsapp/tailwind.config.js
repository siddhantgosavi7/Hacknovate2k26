/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        eco: {
          50: '#eefdf4',
          100: '#d8f8e4',
          200: '#b5efce',
          300: '#7fe2ad',
          400: '#43cb83',
          500: '#1fb767',
          600: '#129553',
          700: '#107744',
          800: '#115f3a',
          900: '#0f4f32',
          950: '#062c1c',
        },
        ink: {
          950: '#07130f',
          900: '#0b1915',
          800: '#10221d',
        },
      },
      boxShadow: {
        glow: '0 0 38px rgba(31, 183, 103, 0.34)',
        glass: '0 24px 80px rgba(7, 19, 15, 0.13)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        scan: 'scan 2.8s ease-in-out infinite',
        shimmer: 'shimmer 2.4s linear infinite',
        pulseSoft: 'pulseSoft 2.8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-22%)', opacity: 0 },
          '15%': { opacity: 1 },
          '70%': { opacity: 1 },
          '100%': { transform: 'translateY(122%)', opacity: 0 },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)', opacity: 0.85 },
          '50%': { transform: 'scale(1.06)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};

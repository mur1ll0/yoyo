/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cosmos: {
          50: '#f3e8ff',
          100: '#e2d1f9',
          200: '#c7a4f2',
          300: '#a878eb',
          400: '#8c4de4',
          500: '#6d28d9',
          600: '#561fae',
          700: '#3f1683',
          800: '#290e58',
          900: '#1a0533',
          950: '#0a0014',
        },
        neon: {
          pink: '#ff2d95',
          purple: '#c245f0',
          blue: '#4da6ff',
          cyan: '#00e5ff',
        },
        midnight: {
          light: '#1e1b4b',
          DEFAULT: '#0f0a2e',
          dark: '#06031a',
        },
      },
      fontFamily: {
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(194, 69, 240, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(194, 69, 240, 0.8), 0 0 40px rgba(194, 69, 240, 0.3)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

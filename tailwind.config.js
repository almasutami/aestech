/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    fontFamily: {
      body: ['Nunito sans', 'sans-serif']
    },
    screens: {
      sm: { min: '0px', max: '499px' },
      md: { min: '500px', max: '932px' },
      lg: { min: '933px', max: '1159px' },
      xl: { min: '1160px', max: '1279px' },
      '2xl': { min: '1280px' }
    },
    extend: {}
  },
  plugins: []
}

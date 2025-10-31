/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui')
  ],
  safelist: [
  { pattern: /^btn/, variants: ['hover', 'focus', 'active', 'disabled'] },
  'btn-primary',
  'btn-secondary',
  'btn-accent',
  'btn-neutral',
  'btn-info',
  'btn-success',
  'btn-warning',
  'btn-error',
],
}


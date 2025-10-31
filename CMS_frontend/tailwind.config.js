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
    "btn",
    "btn-primary",
    "btn-secondary",
    "btn-accent",
    "btn-outline",
    "btn-error",
    "btn-warning",
    "btn-success",
  ]
}


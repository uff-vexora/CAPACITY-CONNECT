/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#22251f', cream: '#f6f4ed', paper: '#fffefa',
        forest: '#4f6b56', clay: '#d98045', rust: '#b45538', line: '#dcdcd2'
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'], serif: ['Libre Baskerville', 'serif'], mono: ['DM Mono', 'monospace']
      }
    }
  },
  plugins: []
}

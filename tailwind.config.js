module.exports = {
  purge: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'sunset': "url('/images/sunset.jpg')",
      })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

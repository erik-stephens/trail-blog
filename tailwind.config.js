module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
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

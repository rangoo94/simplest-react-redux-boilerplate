const javascripts = process.env.NODE_ENV === 'production' ? [
  '/static/vendor.bundle.js',
  '/static/index.js'
] : [
  '/vendor.bundle.js',
  '/index.js'
]

const stylesheets = [
  // '/static/styles.css'
]

/**
 * Build initial state which should be used
 */
const buildInitialState = () => ({
  app: {
    javascripts: javascripts,
    stylesheets: stylesheets
  }
})

export default buildInitialState

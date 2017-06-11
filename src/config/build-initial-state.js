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
    title: 'Some example',
    javascripts: javascripts,
    stylesheets: stylesheets,
    meta: {
      keywords: 'something, else, it is example'
    }
  }
})

export default buildInitialState

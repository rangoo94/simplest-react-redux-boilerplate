const javascripts = [
  '/static/vendor.bundle.js',
  '/static/index.js'
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

function buildConfig () {
  if (process.env.NODE_ENV === 'production') {
    return require('./webpack/production')
  } else {
    return require('./webpack/development')
  }
}

module.exports = buildConfig()

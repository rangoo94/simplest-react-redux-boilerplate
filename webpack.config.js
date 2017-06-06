module.exports = env => {
  return env.prod ? require('./webpack/production') : require('./webpack/development')
}

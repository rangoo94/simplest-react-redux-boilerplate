const path = require('path')

const DEV_PATHS = [
  __dirname,
  path.resolve(path.join(__dirname, '..'))
]

/**
 * Clear 'require' Node.js cache, to allow hot replacement on server side
 */
function clearCache () {
  Object.keys(require.cache).forEach(key => {
    if (DEV_PATHS.find(p => key.substr(0, p.length) === p)) {
      delete require.cache[key]
    }
  })
}

module.exports = clearCache

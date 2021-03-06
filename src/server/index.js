'use strict'

// Set up environment

const IS_PRODUCTION = process.env.NODE_ENV === 'production'

if (!process.env.HTTP_PORT) {
  process.env.HTTP_PORT = 3030
}

if (!process.env.HTTP_INTERFACE) {
  process.env.HTTP_INTERFACE = 'localhost'
}

const { HTTP_INTERFACE, HTTP_PORT } = process.env

// Set up Babel parsing in runtime for development version

if (!IS_PRODUCTION) {
  require('babel-core/register')
}

// Load libraries

const express = require('express')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')

// Set up application

const app = express()

// Set up proper request parsing

app.use(cookieParser())

// Set up logs

app.use(helmet())

// Set up API

app.use('/api', require('./api'))

// Prepare webpack compiler

if (!IS_PRODUCTION) {
  const webpack = require('webpack')
  const devMiddleware = require('webpack-dev-middleware')
  const hotMiddleware = require('webpack-hot-middleware')
  const config = require('../../webpack.config')

  const compiler = webpack(config)

  const devConfig = {
    quiet: false,
    noInfo: true,
    progress: true,
    hot: true,
    publicPath: '/'
  }

  app.use(devMiddleware(compiler, devConfig))

  app.use(hotMiddleware(compiler))
}

// Render website, clear cache for development

const render = IS_PRODUCTION ? require('./render') : (...args) => require('./render')(...args)

if (!IS_PRODUCTION) {
  const clearCache = require('./clear-cache')

  app.get('*', (req, res, next) => {
    clearCache()
    next()
  })
}

app.get('*', render)

// Start listening

app.listen(HTTP_PORT, HTTP_INTERFACE, err => {
  if (err) {
    return console.error(err)
  }

  console.info('Listening at %s:%s', HTTP_INTERFACE, HTTP_PORT)
})

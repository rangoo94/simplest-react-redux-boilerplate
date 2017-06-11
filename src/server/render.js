// Load libraries

import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { render as dispatchApplication } from 'react-redux-async-render'

// Load logic

import prepareApplication from '../prepare-application'
import buildInitialState from '../config/build-initial-state'

// Load UI

import Html from './Html'

/**
 * Show error (only development purposes!)
 *
 * @param {object} res
 */
const handleError = res => err => {
  if (err instanceof Error) {
    return res.send(`
      <h1>${err.toString()}</h1>
      <p>${err.stack}</p>
    `)
  }

  return res.send(`
    <h1>Error</h1>
    <p>${JSON.stringify(err)}</p>
  `)
}

/**
 * Dispatch application with all asynchronous actions
 *
 * @param {Application} app
 */
const dispatch = app => new Promise(resolve => {
  const finish = (result, err) => {
    if (!result || !result.html) {
      if (err instanceof Error) {
        throw err
      }

      throw new Error('Something wrong happened')
    }

    resolve(result)
  }

  dispatchApplication(finish, {
    store: app.store,
    createVirtualDom: app.vdom,
    asyncMiddleware: app.store.async,
    repeatMiddleware: app.store.repeat,
    tries: 1
  })
})

/**
 * Send wrapped HTML response to client
 *
 * @param {Application} app
 * @param {object} res
 */
const send = (app, res) => ({ html, state, actions }) => {
  const code = renderToStaticMarkup(
    <Html
      state={ state }
      actions={ actions }
      html={ html }
      { ...state.app }
    />
  )

  res.send(`<!doctype html>${code}`)
}

/**
 * Render response for client
 *
 * @param {object} req
 * @param {object} res
 * @returns {Promise}
 */
function render (req, res) {
  const app = prepareApplication(req.originalUrl, buildInitialState())

  // Set up basic options

  const finish = send(app, res)
  const error = handleError(res)
  const destroy = () => app.destroy()

  // Dispatch application

  let promise = dispatch(app).then(finish)

  // Show error for development purposes

  if (process.env.NODE_ENV !== 'production') {
    promise = promise.catch(error)
  }

  // Destroy application to avoid memory leaks

  promise.catch(x => x).then(destroy)

  return promise
}

module.exports = render

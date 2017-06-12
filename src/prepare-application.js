// Load libraries

import React from 'react'

// Load configuration

import routes from './config/routes.json'

// Set up factories

import createApplication from './base/create-application'
import createStore from './base/create-store'

// Set up effects & reducers

import * as logic from './logic'

// Load UI

import App from './containers/index'

function render (app) {
  return <App app={ app } />
}

// Load basic logic

import { redirect, setTitle, setMetaTags } from './logic/app/actions'

/**
 * @param {string} url
 * @param {object} data
 */
function prepareApplication (url, data = {}) {
  // Initialize store
  const store = createStore(logic.reducers, logic.effects, data)

  // Initialize API url
  const apiUrl = typeof window !== 'undefined'
    ? '/api' : `http://${process.env.HTTP_INTERFACE}:${process.env.HTTP_PORT}/api`

  // Initialize application
  const app = createApplication(store, routes, apiUrl, render)

  // Make application instance available for effects
  store.shared.app = app

  // Set up basic SEO & routing information
  const state = store.getState()

  if (!state.app.title) {
    app.store.dispatch(setTitle('Simplest iiReact Redux'))
  }

  if (!state.app.meta) {
    app.store.dispatch(setMetaTags({
      keywords: 'simplest, react, redux, boilerplate, universal'
    }))
  }

  if (state.app.url !== url) {
    // TODO: think, when we actually should redirect?
    app.store.dispatch(redirect(url))
  }

  return app
}

export default prepareApplication

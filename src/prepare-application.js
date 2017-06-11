// Load libraries

import React from 'react'

// Set up factories

import createApplication from './base/create-application'
import createStore from './base/create-store'

// Set up effects & reducers

import * as logic from './logic'

// Load UI

import Base from './ui/index'

function render (app) {
  return <Base />
}

/**
 * @param {string} url
 * @param {object} data
 */
function prepareApplication (url, data = {}) {
  // Initialize store
  const store = createStore(logic.reducers, logic.effects, data)

  // Initialize application
  const app = createApplication(store, render)

  // Make application instance available for effects
  store.shared.app = app

  // Go to basic URL
  app.setUrl(url)

  return app
}

export default prepareApplication

// Load libraries

import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'

// Load application & configuration

import prepareApplication from './prepare-application'
import buildInitialState from './config/build-initial-state'

// Set up variables

const element = document.getElementById('app')

const location = window.location
const state = window.$state || buildInitialState()
const actions = window.$actions || []

// Prepare application

let app = prepareApplication(location.href, state)

// Run browser-only actions

for (let action of actions) {
  app.store.dispatch(action)
}

// Render application to DOM tree

function build () {
  const vdom = process.env.NODE_ENV === 'production' ? app.vdom() : (
    <AppContainer>
      { app.vdom() }
    </AppContainer>
  )

  render(vdom, element)
}

build()

if (process.env.NODE_ENV !== 'production' && module.hot) {
  // Accept bootstrap file
  module.hot.accept()

  // Set up hot replacement for UI

  module.hot.accept('./ui/index', build)
}

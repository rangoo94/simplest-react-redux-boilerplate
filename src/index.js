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

const getLocation = () => location.pathname + (location.search || '')

// Prepare application

const app = prepareApplication(getLocation(), state)

// Set up routing

import { redirect } from './logic/app/actions'

window.onpopstate = (...args) => app.store.dispatch(redirect(getLocation()))

// Debug application

window.app = app

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
  module.hot.accept('./components/app', build)
  module.hot.accept('./containers/index', build)
}

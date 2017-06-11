// Load libraries

import { render } from 'react-dom'

// Load application & configuration

import prepareApplication from './prepare-application'
import buildInitialState from './config/build-initial-state'

// Set up variables

const element = document.getElementById('app')

const location = window.location
const state = window.$state || buildInitialState()
const actions = window.$actions || []

// Prepare application

const app = prepareApplication(location.href, state)

// Run browser-only actions

for (let action of actions) {
  app.store.dispatch(action)
}

// Render application to DOM tree

render(app.vdom(), element)

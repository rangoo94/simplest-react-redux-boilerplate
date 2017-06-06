// Set up factories

import createApplication from './base/create-application'
import createStore from './base/create-store'

// Set up effects & reducers

import * as logic from './logic'

function dispatchApplication (url, data = {}) {
  // Initialize store
  const store = createStore(logic.reducers, logic.effects, data)

  // Initialize application
  const app = createApplication(store)

  // Dispatch application
  return app.dispatch(url)
}

export default dispatchApplication

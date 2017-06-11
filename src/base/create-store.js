import { compose, createStore, applyMiddleware, combineReducers } from 'redux'
import { createIgnoreNodeMiddleware, createAsyncMiddleware, createRepeatMiddleware } from 'react-redux-async-render'
import { createMiddleware as createEffectsMiddleware } from 'redux-simple-effects'
import handleReducers from '../base/handle-reducers'

function finalCreateStore (reducers, effects, data = {}) {
  // Set up shared data for side effects

  const shared = {}

  // Handle asynchronous actions on server side

  const ignoreNodeMiddleware = createIgnoreNodeMiddleware()
  const asyncMiddleware = createAsyncMiddleware()
  const repeatMiddleware = createRepeatMiddleware()

  // Set up simple effects middleware

  const effectsMiddleware = createEffectsMiddleware(effects, shared)

  const middlewares = applyMiddleware(
    repeatMiddleware,
    ignoreNodeMiddleware,
    asyncMiddleware,
    effectsMiddleware
  )

  // Initialize store

  Object.keys(reducers).forEach(key => {
    reducers[key] = handleReducers(reducers[key])
  })

  const store = createStore(
    combineReducers(reducers),
    data,
    compose(middlewares)
  )

  // Expose shared data, async & repeat middlewares

  store.shared = shared
  store.async = asyncMiddleware
  store.repeat = repeatMiddleware

  return store
}

export default finalCreateStore

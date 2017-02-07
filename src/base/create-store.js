import { compose, createStore, applyMiddleware, combineReducers } from 'redux'
import { createIgnoreNodeMiddleware, createAsyncMiddleware, createRepeatMiddleware } from 'react-redux-async-render'
import { createMiddleware as createEffectsMiddleware } from 'redux-simple-effects'
import handleReducers from '../base/handle-reducers'

function finalCreateStore(reducers, effects, data = {}) {
    // Handle asynchronous actions on server side

    const ignoreNodeMiddleware = createIgnoreNodeMiddleware()
    const asyncMiddleware = createAsyncMiddleware()
    const repeatMiddleware = createRepeatMiddleware()

    // Set up simple effects middleware

    const effectsMiddleware = createEffectsMiddleware(effects)

    const middlewares = applyMiddleware(
        repeatMiddleware,
        ignoreNodeMiddleware,
        asyncMiddleware,
        effectsMiddleware
    )

    // Initialize store

    Object.keys(reducers).forEach(key => reducers[key] = handleReducers(reducers[key]))

    const store = createStore(
        combineReducers(reducers),
        data,
        compose(middlewares)
    )

    // Expose async & repeat middlewares

    store.async = asyncMiddleware
    store.repeat = repeatMiddleware

    return store
}

export default finalCreateStore

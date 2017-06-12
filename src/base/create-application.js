import Application from './Application'
import Router from '../utils/router'
import ApiClient from '../utils/api-client'

/**
 * Factory for application instance
 * It's separated to allow any abstraction to put there
 *
 * @param {object} store
 * @param {object} routes
 * @param {string} apiUrl
 * @param {function} vdom
 */
const createApplication = (store, routes, apiUrl, vdom) => {
  return new Application(
    store,
    new Router(routes),
    new ApiClient(apiUrl),
    vdom
  )
}

export default createApplication

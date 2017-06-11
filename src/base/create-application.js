import Application from './Application'
import Router from '../utils/router'

/**
 * Factory for application instance
 * It's separated to allow any abstraction to put there
 *
 * @param {object} store
 * @param {object} routes
 * @param {function} vdom
 */
const createApplication = (store, routes, vdom) => {
  return new Application(store, new Router(routes), vdom)
}

export default createApplication

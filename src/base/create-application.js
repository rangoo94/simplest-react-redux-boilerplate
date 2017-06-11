import Application from './Application'

/**
 * Factory for application instance
 * It's separated to allow any abstraction to put there
 *
 * @param {object} store
 * @param {function} vdom
 */
const createApplication = (store, vdom) => new Application(store, vdom)

export default createApplication

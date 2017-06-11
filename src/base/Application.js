/**
 * Application instance, to store data per user session
 */
class Application {
  /**
   * @param {object} store
   * @param {function} vdom
   */
  constructor (store, vdom) {
    this.store = store
    this.vdom = vdom.bind(null, this)
  }

  /**
   * Destroy application to remove garbage
   */
  destroy () {
    this.store.async.clear()
    this.store.repeat.clear()
  }

  /**
   * Set current URL of application
   *
   * @param {string} url
   */
  setUrl (url) {
    this.url = url
  }
}

export default Application

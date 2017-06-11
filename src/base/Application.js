/**
 * Application instance, to store data per user session
 */
class Application {
  /**
   * @param {object} store
   * @param {object} router
   * @param {function} vdom
   */
  constructor (store, router, vdom) {
    this.store = store
    this.router = router
    this.vdom = vdom.bind(null, this)
  }

  /**
   * Destroy application to remove garbage
   */
  destroy () {
    this.store.async.clear()
    this.store.repeat.clear()
  }
}

export default Application

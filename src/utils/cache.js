/**
 * Simple memory cache wrapper
 */
class Cache {
  constructor () {
    this.data = {}
  }

  /**
   * Get value from cache
   *
   * @param {string} name
   * @param {*} [defaultValue]
   * @returns {*}
   */
  get (name, defaultValue) {
    const value = this.data[name]

    if (!value || value.expires <= Date.now()) {
      return defaultValue
    }

    return value.value
  }

  /**
   * Set value with some lifetime
   *
   * @param {string} name
   * @param {*} [value]
   * @param {int} [lifetime]
   */
  set (name, value, lifetime) {
    this.data[name] = {
      value: value,
      expires: Date.now() + lifetime
    }
  }
}

export default Cache

'use strict'

import http from 'httpplease'
import ee from 'event-emitter'

import Cache from './cache'
import { buildQueryString } from './url'

/**
 * Prepare unique hash for request
 *
 * @param {string} method
 * @param {string} url
 * @param {*} body
 * @param {*} headers
 * @return string
 */
function hash (method, url, { body, headers }) {
  return JSON.stringify({ method, url, body, headers })
}

/**
 * Parse response eventually as JSON
 *
 * @param {*} x
 * @returns {*}
 */
function eventuallyJSON (x) {
  try {
    return JSON.parse(x)
  } catch (e) {
    return x
  }
}

/**
 * @class
 */
class ApiClient {
  /**
   * @param {string} url
   * @param {object} [headers]
   * @constructor
   */
  constructor (url, headers) {
    this.url = url.replace(/\/$/, '')
    this.headers = headers || {}
    this.cache = new Cache()
    this.temporaryRequests = {}
  }

  /**
   * @param {string} method
   * @param {string} url
   * @param {object} [query]
   * @param {*} [body]
   * @param {int} [cache]
   * @param {object} [headers]
   * @param {string} [requestId]
   * @returns {Promise}
   */
  request (method, url, { query, body, cache, headers, id: requestId } = {}) {
    // Set up basic values
    url = this.url + '/' + url.replace(/^\//, '')
    method = method.toUpperCase()

    headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...this.headers,
      ...headers
    }

    // Build query string
    if (query && Object.keys(query).length) {
      const glue = url.indexOf('?') === -1 ? '?' : '&'

      url += glue + buildQueryString(query)
    }

    // There shouldn't be body for GET method
    if (method === 'GET') {
      body = void 0
    }

    // Add authorization header if available
    if (this.authorization) {
      headers['Authorization'] = this.authorization
    }

    // Build request hash
    const id = hash(method, url, { body, headers })

    // Try to retrieve cached data
    const cached = this.cache.get(id)

    if (cached) {
      if (cached.response) {
        const finish = cached.error ? Promise.reject : Promise.resolve

        return finish(cached.response)
      }

      return cached
    }

    cache = +cache

    if (cache < 100) {
      cache = 100
    }

    // Abort corresponding request
    if (requestId != null && this.temporaryRequests[requestId]) {
      this.temporaryRequests[requestId].abort()
    }

    // Set up options for request
    const options = {
      url,
      method,
      headers,
      body: body === void 0 ? void 0 : JSON.stringify(body)
    }

    // Make request
    let request
    let promise = new Promise((resolve, reject) => {
      request = http(options, (err, res) => {
        let response = res

        // Parse response
        if (res) {
          res = eventuallyJSON(res.body)
        }

        // Parse error
        if (err) {
          err.body = eventuallyJSON(err.body)
        }

        // Prepare promise
        if (err) {
          promise.response = err
          promise.error = true
        } else {
          promise.response = res
        }

        // Ignore if it's aborted
        if (promise.aborted) {
          return
        }

        // Remove corresponding request
        if (requestId) {
          delete this.temporaryRequests[requestId]
        }

        // Emit information about response (e.g. to handle Unauthorized with some popup)
        this.emit('response', { response, data: res, error: err })

        // Finish request
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
    })

    // Cache response if it's needed
    if (cache) {
      this.cache.set(id, promise, cache)
    }

    // Save request by ID
    if (requestId) {
      this.temporaryRequests[requestId] = promise
    }

    // Allow aborting request from promise level
    promise.abort = () => {
      promise.aborted = true
      request.abort()
    }

    return promise
  }

  /**
   * @param {string} url
   * @param {object} [query]
   * @param {object} [options]
   * @returns {Promise}
   */
  'get' (url, query, options) {
    return this.request('GET', url, { ...options, query })
  }

  /**
   * @param {string} url
   * @param {*} [data]
   * @param {object} [options]
   * @returns {Promise}
   */
  post (url, data, options) {
    return this.request('POST', url, { ...options, data })
  }

  /**
   * @param {string} url
   * @param {*} [data]
   * @param {object} [options]
   * @returns {Promise}
   */
  patch (url, data, options) {
    return this.request('PATCH', url, { ...options, data })
  }

  /**
   * @param {string} url
   * @param {*} [data]
   * @param {object} [options]
   * @returns {Promise}
   */
  put (url, data, options) {
    return this.request('PUT', url, { ...options, data })
  }

  /**
   * @param {string} url
   * @param {*} [data]
   * @param {object} [options]
   * @returns {Promise}
   */
  del (url, data, options) {
    return this.request('DELETE', url, { ...options, data })
  }
}

ee(ApiClient.prototype)

export default ApiClient

import { parse, buildQueryString, parseRoute } from './url'

/**
 * Router class
 */
class Router {
  /**
   * @param {object} routes
   */
  constructor (routes) {
    this.setRoutes(routes)
  }

  /**
   * Set current routes
   *
   * @param {object} routes
   */
  setRoutes (routes) {
    this.routes = Object.keys(routes).map(route => ({
      ...parseRoute(route),
      name: routes[route]
    }))
  }

  /**
   * Find exact route by data
   *
   * @param {string} route
   * @param {object} [params]
   * @returns {object|null}
   */
  findRoute (route, params = {}) {
    for (let r of this.routes) {
      if (r.name === route && !r.params.filter(p => params[p] === void 0).length) {
        return r
      }
    }

    return null
  }

  /**
   * Parse URL to route
   *
   * @param {string} url
   * @returns {object|null}
   */
  parse (url) {
    url = parse(url)

    for (let route of this.routes) {
      let match = url.path.match(route.matcher)
      if (!match) {
        continue
      }

      const result = {
        name: route.name,
        params: { ...url.query }
      }

      route.params.forEach((name, idx) => {
        result.params[name] = match[idx + 1]
      })

      return result
    }

    return null
  }

  /**
   * Build URL from route
   *
   * @param {string} route
   * @param {object} [params]
   * @returns {string|null}
   */
  build (route, params = {}) {
    let routing = this.findRoute(route, params)

    if (!routing) {
      return null
    }

    const url = routing.url.replace(/:([^\s/.]+)/g, ($0, $1) => params[$1])

    params = { ...params }

    for (let key of Object.keys(params)) {
      if (routing.params.indexOf(key) !== -1) {
        delete params[key]
      }
    }

    const qs = buildQueryString(params)

    return qs ? `${url}?${qs}` : url
  }
}

export default Router

import qs from 'query-string'

export function parseQueryString (qs) {
  let result = {}

  if (qs) {
    qs = qs.split('&')

    for (let part of qs) {
      part = part.split('=')
      result[decodeURIComponent(part.shift())] = part.length ? decodeURIComponent(part.join('=')) : true
    }
  }

  return result
}

/**
 * Build query string from object
 *
 * @param {object} data
 * @returns {string}
 */
export function buildQueryString (data) {
  data = Object.assign({}, data)

  for (let key of Object.keys(data)) {
    if (!data[key] || typeof data[key] !== 'object' || Array.isArray(data[key])) {
      continue
    }

    for (let inner of Object.keys(data[key])) {
      data[`${key}[${inner}]`] = data[key][inner]
    }

    delete data[key]
  }

  return qs.stringify(data)
}

export function parse (url) {
  const result = {
    url
  }

  url = url.split('?')
  result.path = url.shift()
  result.query = parseQueryString(url.join('?'))

  // Trim ending slash
  result.path = result.path.replace(/[/]+$/, '') || '/'

  return result
}

export function parseRoute (route) {
  const params = []
  const matcher = new RegExp('^' + route.replace(/:([^\s/.]+)/g, ($0, $1) => {
    params.push($1)
    return '([\\w-]+)'
  }) + '$')

  return {
    url: route,
    matcher,
    params
  }
}

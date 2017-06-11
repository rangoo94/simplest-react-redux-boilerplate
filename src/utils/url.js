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

export function buildQueryString (data) {
  if (!data) {
    return ''
  }

  return Object.keys(data)
    .filter(key => data[key] != null)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
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

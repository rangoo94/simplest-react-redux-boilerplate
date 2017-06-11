function initializeHistory () {
  if (typeof window === 'undefined') {
    return
  }

  const History = window.history || {}

  // Fallback for IE < 10
  if (!History.pushState) {
    let parser = document.createElement('a')

    History.pushState = function (state, title, url) {
      if (window.onpopstate && url !== window.location.pathname.split('?').shift()) {
        if (url.indexOf('//') !== -1) {
          parser.href = url
        }

        window.onpopstate()
      }
    }
  }

  let pushState = History.pushState
  History.pushState = function () {
    let result = pushState.apply(this, arguments)

    if (typeof window.onpushstate === 'function') {
      window.onpushstate()
    }

    return result
  }

  return History
}

export default initializeHistory()

import React from 'react'

const toObject = key => v => {
  if (typeof v !== 'object') {
    return { [key]: v }
  }

  return v
}

/**
 * Build overall HTML element
 *
 * @param {string} title
 * @param {object} state
 * @param {Array<object>} actions
 * @param {string} html
 * @param {Array} links
 * @param {Array} stylesheets
 * @param {Array} javascripts
 * @param {object} meta
 * @param {string} charset
 * @returns {React.Element}
 * @constructor
 */
function Html ({ title, state, actions, html, links = [], stylesheets = [], javascripts = [], meta = {}, charset = 'utf-8' }) {
  const script = `
    window.$actions = ${JSON.stringify(actions)}
    window.$state = ${JSON.stringify(state)}
  `

  const metaElements = Object.keys(meta).map((key, i) => {
    if (typeof meta[key] === 'object') {
      return <meta key={ i } name={ key } { ...meta[key] } />
    } else {
      return <meta key={ i } name={ key } content={ meta[key] } />
    }
  })

  const allLinks = [
    ...links,
    ...stylesheets.map(toObject('href')).map(s => ({ rel: 'stylesheet', ...s }))
  ]

  const linkElements = allLinks.map((link, i) => <link key={ i } { ...link } />)

  const jsElements = javascripts.map(src => <script key={ src } src={ src } />)

  return (
    <html>
      <head>
        <meta charSet={ charset } />
        <title>{ title }</title>
        { metaElements }
        { linkElements }
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: html }} />

        <script dangerouslySetInnerHTML={{ __html: script }} />
        { jsElements }
      </body>
    </html>
  )
}

export default Html

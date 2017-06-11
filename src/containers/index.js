import React from 'react'

import Provider from './provider'

import App from './app'

function BootstrapContainer ({ app }) {
  return (
    <Provider app={ app }>
      <App />
    </Provider>
  )
}

export default BootstrapContainer

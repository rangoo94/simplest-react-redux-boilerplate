import React from 'react'

import RoutingAware from '../mixins/routing-aware'

import App from '../components/app'

import Homepage from '../pages/homepage'
import Error from '../pages/error'

function AppContainer ({ route, routeParams: params }) {
  return (
    <App route={ route } params={ params }>
      <Homepage key="homepage" />
      <Error key="error" />
    </App>
  )
}

export default RoutingAware(AppContainer)

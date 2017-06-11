import React from 'react'
import PropTypes from 'prop-types'

export default Component => {
  class RoutingAware extends React.Component {
    render () {
      const { router, route, routeParams } = this.context
      const { children, ...props } = this.props

      if (!router) {
        throw new Error('Router is required for components using routing')
      }

      return (
        <Component route={ route } routeParams={ routeParams } { ...props }>
          { children }
        </Component>
      )
    }
  }

  RoutingAware.contextTypes = {
    router: PropTypes.object,
    route: PropTypes.string,
    routeParams: PropTypes.object
  }

  RoutingAware.displayName = `RoutingAware(${Component.displayName || Component.name})`

  return RoutingAware
}

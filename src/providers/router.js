import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class RouterProvider extends React.Component {
  getChildContext () {
    return {
      router: this.router,
      route: this.route,
      routeParams: this.params || {}
    }
  }

  constructor (props, context) {
    super(props, context)

    this.setContext(props)
  }

  setContext (props) {
    if (props.router !== this.router) {
      this.router = props.router
    }

    if (props.url !== this.url) {
      const route = this.router.parse(props.url)

      this.url = props.url
      this.route = route ? route.name : null
      this.params = route ? route.params : {}
    }
  }

  componentWillReceiveProps (props) {
    this.setContext(props)
  }

  render () {
    const { children } = this.props

    if (!this.router) {
      throw new Error('You need to pass instance of Router to provider')
    }

    return React.Children.only(children)
  }
}

RouterProvider.childContextTypes = {
  router: PropTypes.object,
  route: PropTypes.string,
  routeParams: PropTypes.object
}

const mapStateToUrl = state => ({ url: state.app.url })

export default connect(mapStateToUrl)(RouterProvider)

import React from 'react'
import PropTypes from 'prop-types'

class AppProvider extends React.Component {
  getChildContext () {
    return {
      app: this.app
    }
  }

  constructor (props, context) {
    super(props, context)
    this.app = props.app
  }

  componentWillReceiveProps (props) {
    if (props.app !== this.app) {
      this.app = props.app
    }
  }

  render () {
    const { children } = this.props

    if (!this.app) {
      throw new Error('You need to pass instance of Application to provider')
    }

    return React.Children.only(children)
  }
}

AppProvider.childContextTypes = {
  app: PropTypes.object
}

export default AppProvider

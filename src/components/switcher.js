import React, { PropTypes, cloneElement } from 'react'

class Switcher extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      element: this.getElement(props)
    }
  }

  shouldComponentUpdate (props, state) {
    return props.active !== this.props.active ||
      props.props !== this.props.props ||
      state.element !== this.state.element
  }

  componentWillReceiveProps (props) {
    this.setState({
      element: this.getElement(props)
    })
  }

  getElement (p) {
    const { active, props } = p
    const children = [].concat(p.children)

    let element
    for (let x of children) {
      if (x.key === active) {
        element = x
        break
      }
    }

    if (props && element) {
      element = cloneElement(element, props)
    }

    return element
  }

  render () {
    return this.state.element || null
  }
}

Switcher.propTypes = {
  props: PropTypes.object,
  active: PropTypes.string,
  children: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ])
}

Switcher.defaultProps = {
  children: []
}

export default Switcher

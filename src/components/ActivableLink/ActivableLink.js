import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

let defaultStyle = {}

let defaultActiveStyle = { // this style is applied when the link is active
  fontWeight: 'bold'
}

/**
 * ActivableLink component is needed to display active links
 */
export default class ActivableLink extends Component {
  static propTypes = {
    to: PropTypes.string,
    style: PropTypes.object,
    activeStyle: PropTypes.object
  }

  static contextTypes = {
    router: React.PropTypes.object // injecting react-router
  }

  render() {
    let style = Object.assign({}, defaultStyle, this.props.style)

    let { router } = this.context
    if (router && router.isActive(this.props.to)) { // the link is active
      style = Object.assign(style, defaultActiveStyle, this.props.activeStyle) // apply the active
      // style
    }

    return (
      <Link {...this.props} style={style}/>
    )
  }
}

import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

let defaultContainerStyle = {}

let defaultActiveContainerStyle = {}

let defaultLinkStyle = {}

let defaultActiveLinkStyle = { // this style is applied when the link is active
  fontWeight: 'bold'
}

/**
 * ActivableLink component is needed to display active links
 */
export default class ActivableLink extends Component {
  static propTypes = {
    to: PropTypes.string,
    style: PropTypes.object,
    activeStyle: PropTypes.object,
    containerStyle: PropTypes.object,
    activeContainerStyle: PropTypes.object
  }

  static contextTypes = {
    router: React.PropTypes.object // injecting react-router
  }

  render() {
    let style = Object.assign({}, defaultLinkStyle, this.props.style)
    let containerStyle = Object.assign({}, defaultContainerStyle, this.props.containerStyle)

    let { router } = this.context
    if (router && router.isActive(this.props.to)) { // the link is active
      // apply active styles
      style = Object.assign(style, defaultActiveLinkStyle, this.props.activeStyle)
      containerStyle = Object.assign(containerStyle, defaultActiveContainerStyle, this.props.activeContainerStyle)
    }

    return (
      <div style={containerStyle}>
        <Link {...this.props} style={style}/>
      </div>
    )
  }
}

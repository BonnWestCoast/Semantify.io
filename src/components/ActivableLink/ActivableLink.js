import React, { Component } from 'react'
import { Link } from 'react-router'

/**
 * ActivableLink component is needed to display active links
 */
export default class ActivableLink extends Component {
  render() {
    let {...rest } = this.props

    return (
      <Link {...rest}/>
    )
  }
}

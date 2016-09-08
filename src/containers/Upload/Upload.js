import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'

/**
 * This class is used to display the upload page
 */
export default class Upload extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div className="container">
        <Helmet title="Upload"/> {/* this is the page header */}
        {this.props.children}
      </div>
    )
  }
}

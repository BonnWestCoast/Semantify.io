import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { ActivableLink } from 'components'

let activableLinkStyles = {
  style: {
    fontSize: '1.3em'
  },
  containerStyle: {
    width: '50%',
    textAlign: 'center',
    padding: '1em'
  },
  activeContainerStyle: {
    background: '#f5f5f5'
  }
}

/**
 * This class is used to display the upload page
 */
@connect(
  () => ({}), // bind nothing
  { pushState: push } // binding push to redux' dispatch
)
export default class Upload extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired
  }

  static contextTypes = {
    router: React.PropTypes.object, // injecting react-router
  }

  componentDidMount() {
    this.redirect() // run it just after mounting
  }

  // redirects to /upload/schema if the route is just /upload
  // it's needed for two reasons: make Upload link in the navbar active in both
  // states (instance and schema) and to prevent loading just /upload page.
  redirect() {
    let { router } = this.context
    if (router && router.isActive('/upload', true)) { // the second argument true means to ckeck
      // the exact path
      this.props.pushState('/upload/schema')
    }
  }

  render() {
    return (
      <div className="container">
        <Helmet title="Upload"/> {/* this is the page header */}
        <div style={{display: 'flex', marginTop: '1em'}}>
          <ActivableLink {...activableLinkStyles} to="/upload/schema">
            Schema
          </ActivableLink>
          <ActivableLink {...activableLinkStyles} to="/upload/instance">
            Instance
          </ActivableLink>
        </div>
        {this.props.children}
      </div>
    )
  }
}

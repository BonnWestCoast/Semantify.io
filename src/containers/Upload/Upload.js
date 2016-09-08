import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { ActivableLink } from 'components'

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
    let { router } = this.context
    if (router) {
      console.log('upload', router.isActive('/upload', true))
      console.log('schema', router.isActive('/upload/schema'))
      console.log('instance', router.isActive('/upload/instance'))
    }

    return (
      <div className="container">
        <Helmet title="Upload"/> {/* this is the page header */}
        <ActivableLink to="/upload/schema">schema</ActivableLink>
        <ActivableLink to="/upload/instance">instance</ActivableLink>
        {this.props.children}
      </div>
    )
  }
}

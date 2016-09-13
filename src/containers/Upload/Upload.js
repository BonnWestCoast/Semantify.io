/**
 * Created by Alexey Karpov
 */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {asyncConnect} from 'redux-async-connect'

// components
import { ActivableLink } from 'components'
import Helmet from 'react-helmet'

// actions
import { push } from 'react-router-redux'
import { loadOntologyList } from '../../redux/modules/ontologyList'

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
@asyncConnect([{
  promise: ({store: {dispatch}}) => {
    return dispatch(loadOntologyList());
  }
}])
@connect(
  () => ({}),
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
        <div style={{marginTop: '1em'}}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

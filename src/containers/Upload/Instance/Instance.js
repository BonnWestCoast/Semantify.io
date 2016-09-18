/**
 * created by Alexey Karpov
 */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// components
import { Button, Input } from 'react-bootstrap'
import { FileUploader } from 'components'

// selectors
import { getSelectedSchema } from 'redux/modules/schema'

let buttonStyle = {
  marginLeft: '0.5em'
}

@connect(
  state => ({
    selectedSchema: getSelectedSchema(state),
  }) // bind nothing. made as a template.
)
export default class Schema extends Component {
  static propTypes = {
    // from @connect
    selectedSchema: PropTypes.object,
  }

  static contextTypes = {
    router: React.PropTypes.object // injecting react-router
  }

  componentDidMount() {
    if (!this.props.selectedSchema) {            // if no schema selected then
      this.context.router.push('/upload/schema') // redirect to upload schema step
    }
  }

  // when user edits text
  editInstance(value) {
    console.log(value)
  }

  // visualise button handler
  visualize() {}

  // semantify button handler
  semantify() {}

  render() {
    return (
      <div>
        <textarea
          className="form-control"
          rows="12"/>
        <div style={{marginTop: '1em'}}>
          <FileUploader onChange={::this.editInstance}/>
          <Button bsStyle="primary" style={buttonStyle} onClick={::this.visualize}>
            Visualize
          </Button>
        </div>
        <hr/>
        <div style={{display: 'flex'}}>
          <Input type="text" placeholder="Ontology name"/>
          <Button bsStyle="primary"
            style={Object.assign({height: '34px'}, buttonStyle)}
            onClick={this.semantify}>
            Semantify
          </Button>
        </div>
      </div>
    )
  }
}

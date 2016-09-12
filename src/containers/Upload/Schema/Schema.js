/**
 * created by Alexey Karpov
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'

// components
import { Button, Input, DropdownButton } from 'react-bootstrap'

let buttonStyle = {
  marginLeft: '0.5em'
}

@connect(
  () => ({}) // bind nothing. made as a template.
)
export default class Schema extends Component {
  static propTypes = {}

  // uploading file button handler
  fileUpload() {}

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
          <DropdownButton
            id="chosing_existing_schema"
            title="Choose from existing schema"/>
          <Button bsStyle="primary" style={buttonStyle} onClick={::this.fileUpload}>
            Upload from file
          </Button>
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

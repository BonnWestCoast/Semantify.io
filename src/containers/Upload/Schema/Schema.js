import React, { Component } from 'react'
import { connect } from 'react-redux'

// components
import { Button, Input, DropdownButton } from 'react-bootstrap'

let buttonStyle = {
  marginLeft: '0.5em'
}

@connect(
  () => ({}) // bind nothing
)
export default class Schema extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <textarea
          className="form-control"
          rows="12"/>
        <div style={{marginTop: '1em'}}>
          <DropdownButton
            title="Choose from existing schema"/>
          <Button bsStyle="primary" style={buttonStyle}>
            Upload from file
          </Button>
          <Button bsStyle="primary" style={buttonStyle}>
            Visualize
          </Button>
        </div>
        <hr/>
        <div style={{display: 'flex'}}>
          <Input type="text"/>
          <Button bsStyle="primary" style={Object.assign({height: '34px'}, buttonStyle)}>
            Semantify
          </Button>
        </div>
      </div>
    )
  }
}

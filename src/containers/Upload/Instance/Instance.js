/**
 * created by Alexey Karpov
 */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// components
import { Button, Input, Alert } from 'react-bootstrap'
import { FileUploader } from 'components'
import Spinner from 'react-spinkit'

// actions
import {
  userInput as instanceUserInput,
  createOntology,
  getCreatingOntologyStatus, // selector
} from 'redux/modules/instance'

// selectors
import { getSelectedSchema } from 'redux/modules/schema'
import {
  getSelectedContent as getSelectedInstanceContent,
  getSelected as getSelectedInstance
} from 'redux/modules/instance'

let buttonStyle = {
  marginLeft: '0.5em'
}

@connect(
  state => ({
    selectedSchema: getSelectedSchema(state),
    selectedInstance: getSelectedInstance(state),
    inputContent: getSelectedInstanceContent(state),
    creatingOntologyStatus: getCreatingOntologyStatus(state),
  }), {
    instanceUserInput,
    createOntology,
  }
)
export default class Schema extends Component {
  static propTypes = {
    // from @connect
    selectedSchema: PropTypes.object,
    selectedInstance: PropTypes.object,
    inputContent: PropTypes.string,
    creatingOntologyStatus: PropTypes.object,

    // bind functions
    instanceUserInput: PropTypes.func.isRequired,
    createOntology: PropTypes.func.isRequired,
  }

  static contextTypes = {
    router: React.PropTypes.object // injecting react-router
  }

  state = {
    ontologyName: ''
  }

  componentDidMount() {
    if (!this.props.selectedSchema) {            // if no schema selected then
      this.context.router.push('/upload/schema') // redirect to upload schema step
    }
  }

  // when user edits text
  editInstance(value) {
    this.props.instanceUserInput(value)
  }

  // visualise button handler
  visualize() {}

  // semantify button handler
  semantify() {
    this.props.createOntology(this.state.ontologyName)
  }

  renderAlert() {
    let { creatingOntologyStatus } = this.props
    if (creatingOntologyStatus.error) {
      return (
        <Alert bsStyle="danger">
          {creatingOntologyStatus.error}
        </Alert>
      )
    }

    if (creatingOntologyStatus.successMessage) {
      return (
        <Alert bsStyle="success">
          {creatingOntologyStatus.successMessage}
        </Alert>
      )
    }

    return null
  }

  render() {
    let { inputContent, creatingOntologyStatus } = this.props

    return (
      <div>
        <textarea
          className="form-control"
          rows="12"
          value={inputContent}
          onChange={event => this.editInstance(event.target.value)}/>
        <div style={{marginTop: '1em'}}>
          <FileUploader onChange={::this.editInstance}/>
          <Button bsStyle="primary" style={buttonStyle} onClick={::this.visualize}>
            Visualize
          </Button>
        </div>
        <hr/>
        <div style={{display: 'flex'}}>
          <Input
            type="text"
            value={this.state.ontologyName}
            placeholder="Ontology name"
            onChange={event => this.setState({ ontologyName: event.target.value })}/>
          <Button bsStyle="primary"
            style={Object.assign({height: '34px'}, buttonStyle)}
            onClick={::this.semantify}>
            Semantify
          </Button>
          <div style={{marginLeft: '0.5em'}}>
          {
            creatingOntologyStatus.run &&
            <Spinner spinnerName="cube-grid" />
          }
          </div>
        </div>
        {this.renderAlert()}
      </div>
    )
  }
}

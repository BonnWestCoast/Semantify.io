/**
 * created by Alexey Karpov
 */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// components
import { Button, Input } from 'react-bootstrap'
import { FileUploader } from 'components'

// actions
import { userInput as instanceUserInput } from 'redux/modules/instance'

// selectors
import { getSelectedSchema } from 'redux/modules/schema'
import { getSelectedInstanceContent } from 'redux/modules/instance'

let buttonStyle = {
  marginLeft: '0.5em'
}

@connect(
  state => ({
    selectedSchema: getSelectedSchema(state),
    inputContent: getSelectedInstanceContent(state),
  }), {
    instanceUserInput
  }
)
export default class Schema extends Component {
  static propTypes = {
    // from @connect
    selectedSchema: PropTypes.object,
    inputContent: PropTypes.string,

    // bind functions
    instanceUserInput: PropTypes.func.isRequired,
  }

  static contextTypes = {
    router: React.PropTypes.object // injecting react-router
  }

  componentDidMount() {
    if (!this.props.selectedSchema) {            // if no schema selected then
      // this.context.router.push('/upload/schema') // redirect to upload schema step
    }
  }

  // when user edits text
  editInstance(value) {
    this.props.instanceUserInput(value)
  }

  // visualise button handler
  visualize() {}

  // semantify button handler
  semantify() {}

  render() {
    let { inputContent } = this.props

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

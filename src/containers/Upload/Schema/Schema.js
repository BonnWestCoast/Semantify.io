/**
 * created by Alexey Karpov
 */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-async-connect'

// components
import { Button, DropdownButton, MenuItem, Modal } from 'react-bootstrap'
import { FileUploader, XMLVisualizer } from 'components'

// actions
import {
  loadList as loadSchemasList,
  select as selectSchema,
  userInput as schemaUserInput,
} from 'redux/modules/schema'

// selectors
import {
  getSchemasArray,
  getSelectedTitle,
  getSelectedSchema,
  doesUserCreateNewSchema,
  getSelectedSchemaContent,
} from 'redux/modules/schema'

let buttonStyle = {
  marginLeft: '0.5em'
}

@asyncConnect([{
  promise: ({ store: { dispatch } }) => {
    return dispatch(loadSchemasList()) // firstly load list of schemas
  }
}])
@connect(
  state => ({
    schemasList: getSchemasArray(state),
    dropdownButtonTitle: getSelectedTitle(state),
    selectedSchema: getSelectedSchema(state),
    creatingNewSchema: doesUserCreateNewSchema(state),
    inputContent: getSelectedSchemaContent(state),
  }),
  {
    selectSchema,
    schemaUserInput,
  }
)
/**
 * this container renders page for uploading or choosing schema
 */
export default class Schema extends Component {
  static propTypes = {
    schemasList: PropTypes.array.isRequired,
    dropdownButtonTitle: PropTypes.string,
    selectedSchema: PropTypes.object,
    creatingNewSchema: PropTypes.bool.isRequired,
    inputContent: PropTypes.string,

    selectSchema: PropTypes.func.isRequired,
    schemaUserInput: PropTypes.func.isRequired,
  }

  static contextTypes = {
    router: React.PropTypes.object // injecting react-router
  }

  state = {
    showModal: false
  }

  // go to next step button handler
  nextStep() {
    if (this.context.router) {
      this.context.router.push('/upload/instance')
    }
  }

  // for input custom schema
  editSchema(value) {
    if (this.props.selectedSchema && this.props.selectedSchema !== 'new') { // reset schema only if it is chosen previously.
      this.props.selectSchema(null)
    }

    this.props.schemaUserInput(value)
  }

  nextStepDisabled() {
    return !this.props.selectedSchema && !this.props.creatingNewSchema
  }

  /**
   * Show modal with XML visualization
   */
  showModal() {
    this.setState({ showModal: true })
  }

  closeModal() {
    this.setState({ showModal: false })
  }

  renderModal() {
    return (
      <Modal show={this.state.showModal} onHide={::this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ontology visualization</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id="visualizer">
            <XMLVisualizer xml={this.props.inputContent}/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={::this.closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  render() {
    let { schemasList, dropdownButtonTitle, inputContent } = this.props

    return (
      <div>
        <span style={{fontSize: '1.4em'}}>Choose or upload schema:</span>
        <textarea
          style={{marginTop: '1em'}}
          className="form-control"
          rows="12"
          value={inputContent}
          onChange={event => this.editSchema(event.target.value)}
          /> {/** we reset selected schema if user prefers to input the new one. */}

        <div style={{marginTop: '1em'}}>
          <DropdownButton
            id="chosing_existing_schema"
            title={dropdownButtonTitle || 'Choose from existing schemas'}>
            {
              schemasList.map((schema) => (
                <MenuItem
                  key={schema.id}
                  onSelect={() => this.props.selectSchema(schema.id)}>
                  {schema.name}
                </MenuItem>
              ))
            }
          </DropdownButton>
          <FileUploader onChange={::this.editSchema}/>
          <Button bsStyle="primary" style={buttonStyle} onClick={::this.showModal}>
            Visualize
          </Button>
        </div>
        <hr/>
        <div style={{display: 'flex'}}>
          <Button bsStyle="primary"
            style={Object.assign({height: '34px'}, buttonStyle)}
            onClick={::this.nextStep}
            disabled={this.nextStepDisabled()}>
            Next step
          </Button>
        </div>
        {this.renderModal()}
      </div>
    )
  }
}

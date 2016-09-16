/**
 * created by Alexey Karpov
 */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-async-connect'

// components
import { Button, DropdownButton, MenuItem } from 'react-bootstrap'

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

  // uploading file button handler
  fileUpload() {}

  // visualise button handler
  visualize() {}

  // go to next step button handler
  nextStep() {}

  // for input custom schema
  editSchema({ target: { value } }) {
    if (this.props.selectedSchema && this.props.selectedSchema !== 'new') { // reset schema only if it is chosen previously.
      this.props.selectSchema(null)
    }

    this.props.schemaUserInput(value)
  }

  nextStepDisabled() {
    return !this.props.selectedSchema && !this.props.creatingNewSchema
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
          onChange={::this.editSchema}
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
          <Button bsStyle="primary" style={buttonStyle} onClick={::this.fileUpload}>
            Upload from file
          </Button>
          <Button bsStyle="primary" style={buttonStyle} onClick={::this.visualize}>
            Visualize
          </Button>
        </div>
        <hr/>
        <div style={{display: 'flex'}}>
          <Button bsStyle="primary"
            style={Object.assign({height: '34px'}, buttonStyle)}
            onClick={this.nextStep}
            disabled={this.nextStepDisabled()}>
            Next step
          </Button>
        </div>
      </div>
    )
  }
}

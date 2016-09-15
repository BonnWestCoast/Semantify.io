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
} from 'redux/modules/schema'

// selectors
import {
  getSchemasArray,
  getSelectedTitle,
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
    dropdownButtonTitle: getSelectedTitle(state)
  }),
  {
    selectSchema
  }
)
/**
 * this container renders page for uploading or choosing schema
 */
export default class Schema extends Component {
  static propTypes = {
    schemasList: PropTypes.array.isRequired,
    dropdownButtonTitle: PropTypes.string,

    selectSchema: PropTypes.func.isRequired
  }

  // uploading file button handler
  fileUpload() {}

  // visualise button handler
  visualize() {}

  // go to next step button handler
  nextStep() {}

  render() {
    let { schemasList, dropdownButtonTitle } = this.props

    return (
      <div>
        <span style={{fontSize: '1.4em'}}>Choose or upload schema:</span>
        <textarea
          style={{marginTop: '1em'}}
          className="form-control"
          rows="12"/>
        <div style={{marginTop: '1em'}}>
          <DropdownButton
            id="chosing_existing_schema"
            title={dropdownButtonTitle || 'Choose from existing schemas'}>
            {
              schemasList.map((schema, index) => (
                <MenuItem
                  key={schema.id}
                  onSelect={() => this.props.selectSchema(index)}>
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
            onClick={this.nextStep}>
            Next step
          </Button>
        </div>
      </div>
    )
  }
}

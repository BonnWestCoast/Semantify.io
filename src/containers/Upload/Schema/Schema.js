/**
 * created by Alexey Karpov
 */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-async-connect'

// components
import { Button, Input, DropdownButton, MenuItem } from 'react-bootstrap'

// actions
import { loadList as loadSchemasList } from 'redux/modules/schema'

// selectors
import { getSchemasArray } from 'redux/modules/schema'

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
    schemasList: getSchemasArray(state)
  })
)
/**
 * this container renders page for uploading or choosing schema
 */
export default class Schema extends Component {
  static propTypes = {
    schemasList: PropTypes.array.isRequired
  }

  state = {
    choosenSchemaIndex: null
  }

  onSelect(index) {
    this.setState({
      choosenSchemaIndex: index
    })
  }

  // uploading file button handler
  fileUpload() {}

  // visualise button handler
  visualize() {}

  // semantify button handler
  semantify() {}

  render() {
    let { schemasList } = this.props
    let { choosenSchemaIndex } = this.state

    let dropdownButtonTitle
    if (choosenSchemaIndex === null) {
      dropdownButtonTitle = 'Choose from existing schema'
    } else {
      dropdownButtonTitle = schemasList[choosenSchemaIndex].name
    }

    return (
      <div>
        <textarea
          className="form-control"
          rows="12"/>
        <div style={{marginTop: '1em'}}>
          <DropdownButton
            id="chosing_existing_schema"
            title={dropdownButtonTitle}>
            {
              schemasList.map((schema, index) => (
                <MenuItem
                  key={schema.id}
                  onSelect={() => this.onSelect(index)}>
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

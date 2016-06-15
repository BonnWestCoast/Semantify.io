// Alexey Karpov
// 13.06.2016

import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

// components
import {ListGroup, ListGroupItem} from 'react-bootstrap'

// selectors
import {schema as getSchema} from 'redux/selectors/schemasList'

// the class renders previously uploaded files
@connect((state, {params: {id}}) => ({schema: getSchema(state, id)}))
export default class Schema extends Component {
  static propTypes = {
    schema: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
  }

  // if the required object exists than render() use this method
  content() {
    let {schema} = this.props

    return (
      <div>
        <h1>{schema.name}</h1>
        <p>{schema.text}</p>
      </div>
    )
  }

  // this methods is used by render() if the required object has not found
  notFound() {
    let id = this.props.params.id
    return (
      <ListGroup>
        <ListGroupItem header="Schema not found" bsStyle="danger">Schema id ({id}) not found</ListGroupItem>
      </ListGroup>
    )
  }

  render() {
    return (
      <div className="container">
        {!!this.props.schema ? this.content() : this.notFound()}
      </div>
    )
  }
}

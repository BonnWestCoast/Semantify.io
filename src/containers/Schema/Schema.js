import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import {ListGroup, ListGroupItem} from 'react-bootstrap'

import {schema as getSchema} from 'redux/selectors/schemasList'

@connect((state, {params: {id}}) => ({schema: getSchema(state, id)}))
export default class Schema extends Component {
  static propTypes = {
    schema: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
  }

  content() {
    let {schema} = this.props

    return (
      <div>
        <h1>{schema.name}</h1>
        <p>{schema.text}</p>
      </div>
    )
  }

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

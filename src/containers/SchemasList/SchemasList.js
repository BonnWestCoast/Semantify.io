import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import {list as getList} from 'redux/selectors/schemasList'

@connect(state => ({list: getList(state)}))
export default class SchemasList extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired
  }

  render() {
    return (
      <div className="container">
        <h1>Schemas List</h1>
        <ul>
          {this.props.list.map(it => <li key={it.id}>{it.name}</li>)}
        </ul>
      </div>
    )
  }
}

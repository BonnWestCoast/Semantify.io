import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

// components
import {Link} from 'react-router'

// selectors
import {list as getList} from 'redux/selectors/schemasList'

// this class shows the list of all previously uploaded files
@connect(state => ({list: getList(state)}))
export default class SchemasList extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired
  };

  render() {
    return (
      <div className="container">
        <h1>Schemas List</h1>
        <ul>
          {
            this.props.list.map(it =>
              <li key={it.id}>
                <Link to={`/schema/${it.id}`}>{it.name}</Link>
              </li>
            )
          }
        </ul>
      </div>
    )
  }
}

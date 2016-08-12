/**
 * Created by akorovin on 12.08.2016.
 */

import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {getOntologyList} from 'redux/se'

@connect(
  state => ({list: getOntologyList(state)})
)
export default class OntologyList extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired
  };

  render() {
    return (
      <div className="dropdown">
        <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
          Dropdown
          <span className="caret" />
        </button>
        <ul className="dropdown-menu">
          <li><a href="#">Action</a></li>
          <li><a href="#">Another action</a></li>
          <li><a href="#">Something else here</a></li>
          <li role="separator" className="divider" />
          <li><a href="#">Separated link</a></li>
        </ul>
      </div>
    )
  }
}

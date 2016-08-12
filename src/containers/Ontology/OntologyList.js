/**
 * Created by akorovin on 12.08.2016.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {loadOntologyList} from 'redux/modules/ontologyList';
import {DropdownButton, MenuItem} from 'react-bootstrap';

@connect(
  state => ({
    list: loadOntologyList(state),
    chosenOntology: state.ontologyList.chosenOntology
  })
)
export default class OntologyList extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    chosenOntology: PropTypes.string
  };

  render() {
    console.log(this.props);
    return (
      <DropdownButton title="List of ontologies">
        {
          this.props.list.map(it => {
            console.log(it)
            return <MenuItem href="#">{it}</MenuItem>
          })
        }
      </DropdownButton>
    )
  }
}
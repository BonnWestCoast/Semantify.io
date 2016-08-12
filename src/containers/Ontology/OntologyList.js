/**
 * Created by akorovin on 12.08.2016.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import {loadOntologyList} from 'redux/modules/ontologyList';
import {DropdownButton, MenuItem} from 'react-bootstrap';

@asyncConnect([{
  promise: ({store: {dispatch}}) => {
    return dispatch(loadOntologyList());
  }
}])
@connect(
  state => ({
    list: state.ontologyList.list,
    chosenOntology: state.ontologyList.chosenOntology
  }),
  {loadOntologyList}
)
export default class OntologyList extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    chosenOntology: PropTypes.string
  };

  static componentWillReceiveProps(nextProps) {
    console.log('olo');
  }

  render() {
    return (
      <DropdownButton id="ontologyList" title="List of ontologies">
        {
          this.props.list.map(it => {
            console.log(it)
            return <MenuItem href="#" className="ontology-list-el" key={it}>{it}</MenuItem>
          })
        }
      </DropdownButton>
    )
  }
}

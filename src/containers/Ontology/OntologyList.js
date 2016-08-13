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
    data: state.ontologyList.data,
    chosenOntology: state.ontologyList.chosenOntology
  }),
  {loadOntologyList}
)
export default class OntologyList extends Component {
  static propTypes = {
    data: PropTypes.object,
    chosenOntology: PropTypes.string
  };

  static componentWillReceiveProps(nextProps) {
    console.log('olo');
  }

  render() {
    console.log(this.props)
    return (
      <DropdownButton id="ontologyList" title="List of ontologies">
        {
          this.props.data.message.map(it => {
            console.log(it)
            return <MenuItem href="#" className="ontology-list-el" key={it}>{it}</MenuItem>
          })
        }
      </DropdownButton>
    )
  }
}

/**
 * Created by akorovin on 12.08.2016.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import OntologyList from './OntologyList';
import OntologySparql from './OntologySparql';
// import {loadOntologyText} from 'redux/modules/info';
import {loadOntologyList} from '../../redux/modules/ontologyList';

@asyncConnect([{
  promise: ({store: {dispatch}}) => {
    return dispatch(loadOntologyList());
  }
}])
@connect(
  state => ({ontology: '', dataList: state.ontologyList.data}),
  {loadOntologyList}
)
export default class Ontology extends Component {
  static propTypes = {
    ontology: PropTypes.string,
    dataList: PropTypes.object,
    loadOntologyList: PropTypes.func.isRequired
  };

  render() {
    return (
      <div id="ontology-container">
        <OntologyList list={this.props.dataList.message}/>
        <button type="submit" className="btn btn-success">Visualize</button>
        <label htmlFor="sparqlTextarea">Ontology Content: </label>
        <textarea className="form-control" id="ontology" rows="5" readOnly="readOnly" />
        <OntologySparql />
      </div>
    )
  }
}

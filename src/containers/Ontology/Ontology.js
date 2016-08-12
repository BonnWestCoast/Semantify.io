/**
 * Created by akorovin on 12.08.2016.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import OntologyList from './OntologyList';
import OntologySparql from './OntologySparql';
import {loadOntologyText} from 'redux/modules/info';

@connect(
  state => ({ontology: ''})
)
export default class Ontology extends Component {
  static propTypes = {
    ontology: PropTypes.string
  };

  render() {
    return (
      <div id="ontology-container">
        <OntologyList />
        <button type="submit" className="btn btn-success">Visualize</button>
        <label htmlFor="sparqlTextarea">Ontology Content: </label>
        <textarea className="form-control" id="ontology" rows="5" />
      </div>
    )
  }
}
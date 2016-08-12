/**
 * Created by akorovin on 12.08.2016.
 */

import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {OntologyList} from 'OntologyList'

@connect(
  state => ({ontology: state.ontology})
)
export default class Ontology extends Component {
  static propTypes = {
    ontology: PropTypes.string
  };

  render() {
    return (
      <div id="ontology-container" >
        <OntologyList />
        <button type="submit" className="btn btn-success">Visualize</button>
        <OntologySparql />
      </div>
    )
  }
}
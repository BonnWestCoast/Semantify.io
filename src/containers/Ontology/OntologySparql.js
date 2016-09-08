/**
 * Created by akorovin on 12.08.2016.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

/**
 * Component for sending sparql query to server
 */
@connect(
  state => ({
    chosenOntology: state.ontologyList.chosenOntology
  })
)
export default class OntologySparql extends Component {
  static propTypes = {
    chosenOntology: PropTypes.string
  };

  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="sparqlTextarea">SPARQL Query</label>
          <textarea className="form-control" id="sparql" rows="3" />
        </div>
        <button type="submit" className="btn btn-primary">Run</button>
      </form>
    )
  }
}

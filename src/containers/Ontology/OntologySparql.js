/**
 * Created by akorovin on 12.08.2016.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {runSparql} from 'redux/modules/ontologySparql';

/**
 * Component for sending sparql query to server
 */
@connect(
  state => ({
    chosenOntology: state.ontologyList.chosenOntology
  }),
  {runSparql}
)
export default class OntologySparql extends Component {
  static propTypes = {
    chosenOntology: PropTypes.string
  };

  run = (event) => {
    event.preventDefault();
    let text = this.refs.query.value;
    console.log(this.props.chosenOntology);
    console.log(text);
    this.props.runSparql(this.props.chosenOntology, text);
    // TODO: run query
  };

  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="sparqlTextarea">SPARQL Query</label>
          <textarea className="form-control" id="sparql" rows="3" ref="query"/>
        </div>
        <button type="submit" className="btn btn-primary"
                onClick={this.run}>Run</button>
      </form>
    )
  }
}

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
    chosenOntology: state.ontologyList.chosenOntology,
    result: state.ontologySparql.data
  }),
  {runSparql}
)
export default class OntologySparql extends Component {
  static propTypes = {
    chosenOntology: PropTypes.string,
    result: PropTypes.string,
    runSparql: PropTypes.func
  };

  run = (event) => {
    event.preventDefault();
    let text = this.refs.query.value;
    this.props.runSparql(this.props.chosenOntology, text);
  };

  render() {
    let CurrentSnipTextAreaSty = {
      fontSize: '1em',
      height: 'calc(50% - 20px)',
      overflowY: 'auto',
      padding: '5px',
      width: 'calc(100% - 12px)'
    };

    return (
      <form>
        <div className="form-group">
          <label htmlFor="sparqlTextarea">SPARQL Query</label>
          <textarea className="form-control" id="sparql" rows="6" ref="query"/>
          <textarea className="form-control" id="sparql-res"
                    rows="6"
                    ref="query-res"
                    value={this.props.result.data}
                    style={CurrentSnipTextAreaSty}
          />
        </div>
        <button type="submit" className="btn btn-primary"
                onClick={this.run}>Run</button>
      </form>
    )
  }
}

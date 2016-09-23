/**
 * Created by akorovin on 12.08.2016.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {runSparql, changeCurrentQuery} from 'redux/modules/ontologySparql';
import Spinner from 'react-spinkit';

/**
 * Component for sending sparql query to server
 */
@connect(
  state => ({
    chosenOntology: state.ontologyList.chosenOntology,
    result: state.ontologySparql.data,
    query: state.ontologySparql.query,
    isLoading: state.ontologySparql.uploading
  }),
  {runSparql, changeCurrentQuery}
)
export default class OntologySparql extends Component {
  static propTypes = {
    chosenOntology: PropTypes.string,
    result: PropTypes.object,
    runSparql: PropTypes.func,
    query: PropTypes.string,
    changeCurrentQuery: PropTypes.func,
    isLoading: PropTypes.bool
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
      <div>
        <div className="form-group">
          <label htmlFor="sparqlTextarea" style={{paddingTop: '5px'}}>SPARQL Query</label>
          <textarea className="form-control" id="sparql"
                    rows="6"
                    ref="query"
                    style={{width: 'calc(100% - 12px)'}}
                    value={this.props.query}
                    onChange={(event) => {this.props.changeCurrentQuery(event.target.value)}}
          />
          <label style={{paddingTop: '5px'}}>SPARQL Result</label>
          <textarea className="form-control" id="sparql-res"
                    rows="6"
                    ref="query-res"
                    value={this.props.result.data}
                    style={CurrentSnipTextAreaSty}
          />
        </div>
        <div style={{display: 'flex'}}>
          <button type="submit" className="btn btn-primary"
                  onClick={this.run} style={{marginRight: '5px'}}>Run</button>
          {
            this.props.isLoading &&
            <Spinner spinnerName="cube-grid" />
          }
        </div>
      </div>
    )
  }
}

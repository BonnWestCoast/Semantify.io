/**
 * Created by akorovin on 12.08.2016.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import OntologyList from './OntologyList';
import OntologySparql from './OntologySparql';
import {loadOntologyList} from '../../redux/modules/ontologyList';

/**
 * Component for showing ontology page
 */
@asyncConnect([{
  promise: ({store: {dispatch}}) => {
    return dispatch(loadOntologyList());
  }
}])
@connect(
  state => ({ontology: state.ontology, dataList: state.ontologyList.data}),
  {loadOntologyList}
)
export default class Ontology extends Component {
  static propTypes = {
    ontology: PropTypes.object,
    dataList: PropTypes.object,
    loadOntologyList: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    // TODO: probably anti-pattern
    //this.state = {ontology: {'data': {'message':''}}};
    this.state = {ontology: props.ontology};
  }

  render() {
    const styles = require('./Ontology.scss');
    const list = this.props.dataList.message;
    // get first element for initializing dropdown
    const chosenOntology = list.length > 0? list[0] : '';

    return (
      <div className={styles.ontologyPage + ' container'}>
        <div className="row">
          <div className={styles.ontologyList}>
            <OntologyList list={list} chosenOntology={chosenOntology}/>
            <button type="submit" className="btn btn-success">Visualize</button>
          </div>
        </div>
        <div className="row">
          <label htmlFor="ontologyTextarea">Ontology Content: </label>
          <textarea className="form-control"
                    id="ontology" rows="5"
                    value={this.props.ontology.data.message}
                     />
        </div>
        <div className="row">
          <OntologySparql />
        </div>
      </div>
    )
  }
}

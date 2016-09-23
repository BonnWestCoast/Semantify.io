/**
 * Created by akorovin on 12.08.2016.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import OntologyList from './OntologyList';
import OntologySparql from './OntologySparql';
import {loadOntologyList} from '../../redux/modules/ontologyList';
import {clear} from '../../redux/modules/visualizer';
import {Button, Modal} from 'react-bootstrap';
import Visualizer from '../Visualizer/Visualizer';
import { loadOntology } from '../../redux/modules/visualizer';
import Spinner from 'react-spinkit';

/**
 * Component for showing ontology page
 */
@asyncConnect([{
  promise: ({store: {dispatch}}) => {
    return dispatch(loadOntologyList());
  }
}])
@connect(
  state => ({
    ontology: state.ontology,
    dataList: state.ontologyList.data,
    chosenOntology: state.ontologyList.chosenOntology,
    isLoading: state.ontology.loading
  }),
  {loadOntologyList, clear, loadOntology}
)
export default class Ontology extends Component {
  static propTypes = {
    ontology: PropTypes.object,
    dataList: PropTypes.object,
    chosenOntology: PropTypes.string,
    loadOntologyList: PropTypes.func.isRequired,
    clear: PropTypes.func.isRequired,
    loadOntology: PropTypes.func.isRequired,
    isLoading: PropTypes.bool
  };

  constructor(props) {
    super(props);
    // TODO: probably anti-pattern
    this.state = {ontology: props.ontology};
  }

  state = {
    showModal: false
  };

  close = () => {
    this.setState({ showModal: false });
    this.props.clear();
  };

  open = () => {
    this.props.loadOntology(this.props.chosenOntology);
    this.setState({ showModal: true });
  };

  render() {
    const styles = require('./Ontology.scss');
    const list = this.props.dataList.data;
    // get first element for initializing dropdown
    const chosenOntology = '';

    let CurrentSnipTextAreaSty = {
      fontSize: '1em',
      height: 'calc(50% - 20px)',
      overflowY: 'auto',
      padding: '5px',
      width: 'calc(100% - 12px)'
    };

    return (
      <div className={styles.ontologyPage + ' container'}>
        <div className="row">
          <div className={styles.ontologyList}>
            <OntologyList list={list} chosenOntology={chosenOntology}/>
            <Button bsStyle="primary" onClick={this.open}>
              Visualize
            </Button>
            {
              this.props.isLoading &&
              <Spinner spinnerName="cube-grid" />
            }
          </div>
        </div>
        <div className="row">
          <label htmlFor="ontologyTextarea">Ontology Content: </label>
          <textarea className="form-control"
                    id="ontology" rows="5"
                    value={this.props.ontology.data.data}
                    style={CurrentSnipTextAreaSty}
                     />
        </div>
        <div className="row">
          <OntologySparql />
        </div>
        <Modal show={this.state.showModal} onHide={this.close} bsSize="large" aria-labelledby="contained-modal-title-lg">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">Ontology visualization</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div id="visualizer">
              <Visualizer />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

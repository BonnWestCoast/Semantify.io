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
  {loadOntologyList, clear}
)
export default class Ontology extends Component {
  static propTypes = {
    ontology: PropTypes.object,
    dataList: PropTypes.object,
    loadOntologyList: PropTypes.func.isRequired,
    clear: PropTypes.func.isRequired
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
    this.setState({ showModal: true });
  };

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
            <Button bsStyle="primary" onClick={this.open}>
              Visualize
            </Button>
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
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Ontology visualization</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Visualizer />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

/**
 * Created by akorovin on 12.08.2016.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';

// components
import { OntologyList } from 'components'
import OntologySparql from './OntologySparql'
import {Button, Modal} from 'react-bootstrap'
import Visualizer from '../Visualizer/Visualizer'

// actions
import { loadOntology } from '../../redux/modules/visualizer'
import { loadOntologyList } from '../../redux/modules/ontologyList'
import { clear } from '../../redux/modules/visualizer'

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
  {clear, loadOntology}
)
export default class Ontology extends Component {
  static propTypes = {
    ontology: PropTypes.object,
    dataList: PropTypes.object,
    clear: PropTypes.func.isRequired,
    loadOntology: PropTypes.func.isRequired
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
    this.props.loadOntology();
    this.setState({ showModal: true });
  };

  render() {
    const styles = require('./Ontology.scss');
    let list = []
    if (this.props.dataList && this.props.dataList.message) { // if message exists
      list = this.props.dataList.message
    }

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
            <OntologyList list={list}/>
            <Button bsStyle="primary" onClick={this.open}>
              Visualize
            </Button>
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
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Ontology visualization</Modal.Title>
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

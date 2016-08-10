import React, {Component, PropTypes} from 'react';
import { asyncConnect } from 'redux-async-connect';
import {connect} from 'react-redux';
import Graph from './Graph';
import { loadOntology } from '../../redux/modules/info';

/**
 * Class for visualizing ontology
 * Using vis.js library
 */
@asyncConnect([{
  promise: ({store: {dispatch}}) => {
    return dispatch(loadOntology());
  }
}])
@connect(
  state => ({data: state.info.data}),
  {loadOntology})
export default class Visualizer extends Component {
  static propTypes = {
    data: PropTypes.object,
    loadOntology: PropTypes.func.isRequired
  };

  /**
   * On click handler
  */
  handleVisualize = () => {
    console.log('initialize app attempt');
    console.log('finish handleVisualize');
  };

  render() {
    console.log(this.props);
    return (
      <div className="visualize-container">
        <button className="btn btn-success"
                style={{marginLeft: 50}}
                onClick={this.handleVisualize.bind(this)}>
          Visualize</button>
          <Graph graph={this.props.data.message}/>
       </div>
    );
  }
}

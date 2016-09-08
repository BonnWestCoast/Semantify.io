import React, {Component, PropTypes} from 'react';
// import { asyncConnect } from 'redux-async-connect';
import {connect} from 'react-redux';
import Graph from './Graph';
import { loadOntology } from '../../redux/modules/visualizer';

/**
 * Class for visualizing ontologies
 * Using vis.js library
 */
// @asyncConnect([{
//   promise: ({store: {dispatch}}) => {
//     return dispatch(loadOntology());
//   }
// }])
@connect(
  state => ({data: state.visualizer.data}),
  {loadOntology})
export default class Visualizer extends Component {
  static propTypes = {
    data: PropTypes.object,
    loadOntology: PropTypes.func.isRequired
  };

  render() {
    const { data } = this.props;

    if (!data || data.message === '') {
      this.props.loadOntology();
      return (
        <div>Loading</div>
      )
    }

    return (
      <div className="visualize-container">
          <Graph graph={this.props.data.message}/>
       </div>
    );
  }
}

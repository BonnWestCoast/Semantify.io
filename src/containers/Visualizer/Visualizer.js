import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Graph from './Graph';

/**
 * Class for visualizing ontologies
 * Using vis.js library
 */
@connect(
  state => ({data: state.visualizer.data}),
  {})
export default class Visualizer extends Component {
  static propTypes = {
    data: PropTypes.object
  };

  render() {
    const { data } = this.props;

    if (!data || data.message === '') {
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

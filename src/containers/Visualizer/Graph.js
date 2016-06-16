import React, {Component, PropTypes} from 'react';
const vis = require('vis');

/**
 * Vis.js Wrapper Class. Handles vis.js events.
 */
export default class Graph extends Component {
  static propTypes = {
    graph: PropTypes.object,
    identifier: PropTypes.string,
    style: PropTypes.object
  };

  static defaultProps = {
    graph: {},
    identifier: 'graph',
    style: {width: '640px', height: '480px'}
  };

  state = {
    networkLayout: true
  };

  componentDidMount() {
    this.updateGraph();
  }

  componentDidUpdate() {
    this.updateGraph();
  }

  /**
   * Method to change to hierarchical layout
   * */
  changeMode = () => {
    this.setState({networkLayout: !this.state.networkLayout});
    this.updateGraph();
  }

  /**
   * Refreshing graph method
  */
  updateGraph = () => {
    console.log('UpdateGraph start in: ' + this.props.identifier);
    const container = document.getElementById(this.props.identifier);
    const options = {
      autoResize: true,
      height: '100%',
      width: '100%',
      clickToUse: false,
      edges: {
        color: '#000000',
        width: 0.5
      },
      layout: {
        randomSeed: undefined,
        improvedLayout: true,
        hierarchical: {
          enabled: false,
          levelSeparation: 150,
          nodeSpacing: 100,
          treeSpacing: 200,
          blockShifting: true,
          edgeMinimization: true,
          parentCentralization: true,
          direction: 'UD',        // UD, DU, LR, RL
          sortMethod: 'hubsize'   // hubsize, directed
        }
      }
    };

    return new vis.Network(container, this.props.graph, options);
  }

  render() {
    const {identifier, style} = this.props;
    console.log('id: ' + identifier);
    console.log('style: ' + style);

    return (
      <div
        onDoubleClick={this.changeMode.bind(this)}
        style={style}
        id={identifier}>
      </div>
    );
  }
}

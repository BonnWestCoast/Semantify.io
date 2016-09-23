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
    identifier: 'graph'
  };

  state = {
    networkLayout: true
  };

  componentDidMount() {
    let rootData = this.props.graph.root;
    this.nodes = new vis.DataSet(rootData.nodes);
    this.edges = new vis.DataSet(rootData.edges);

    this.chart = this.createGraph({
      nodes: this.nodes,
      edges: this.edges
    });

    this.bindEvents();
  }

  componentDidUpdate() {
    this.updateGraph();
  }

  bindEvents() {
    this.chart.on('doubleClick', (params) => {
      params.event = '[original event]';
      let selNodes = params.nodes;
      for (let node of selNodes) {
        this.expandNode(node);
      }
      console.log('<h2>doubleClick event:</h2>' + JSON.stringify(params, null, 4));
    });
  }

  /**
   * Method to expand node
   * @param node
     */
  expandNode(node) {
    // connections to node (arr of ids)
    let connections = this.props.graph.toFromLookup[node];
    if (!connections) {
      return;
    }

    let allEdges = this.props.graph.edges;
    let nodesToAdd = [];
    let edgesToAdd = [];

    for (let connection of connections) {
      // create node
      nodesToAdd.push({
        id: connection,
        label: connection
      });
    }
    // first update nodes, otherwise we cannot add edges
    // which are connected to new nodes
    this.nodes.update(nodesToAdd);

    for (let connection of connections) {
      let connectionEdges = allEdges[connection];
      for (let edge of connectionEdges) {
        if (this.isValidEdge(edge)) {
          edgesToAdd.push(edge);
        }
      }
    }

    this.edges.update(edgesToAdd);
  }

  /**
   * Check if edge really has connection with node
   * @param edge
     */
  isValidEdge(edge) {
    return edge && this.nodes.get(edge.to);
  }

  /**
   * Method to change to hierarchical layout
   * */
  changeMode = () => {
    this.setState({networkLayout: !this.state.networkLayout});
    this.updateGraph();
  };

  /**
   * Refreshing graph method
  */
  updateGraph = () => {
    console.log('UpdateGraph start in: ' + this.props.identifier);
    this.chart.redraw();
  };

  createGraph = (data) => {
    const container = document.getElementById(this.props.identifier);
    const options = {
      autoResize: true,
      height: screen.availHeight.toString() + 'px',
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
      },
      interaction: {
        navigationButtons: true,
        keyboard: true
      }
    };

    return new vis.Network(container, data, options);
  };

  render() {
    const {identifier} = this.props;
    const style = {
      width: '100%',
      height: window.screen.availHeight + 'px'
    };
    return (
      <div
        onDoubleClick={this.changeMode.bind(this)}
        style={style}
        id={identifier}>
      </div>
    );
  }
}

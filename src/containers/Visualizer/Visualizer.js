import React, {Component} from 'react';
import Graph from './Graph';

export default class Visualizer extends Component {
  state = {
    file: {},
    isShown: false
  };

  fetchFile = () => {
    console.log('start fetch file');
    const textExample = {
      nodes: [
          {id: 1, label: 'Node 1'},
          {id: 2, label: 'Node 2'},
          {id: 3, label: 'Node 3'},
          {id: 4, label: 'Node 4'},
          {id: 5, label: 'Node 5'}
      ],
      edges: [
          {from: 1, to: 2},
          {from: 1, to: 3},
          {from: 2, to: 4},
          {from: 2, to: 5}
      ]
    };
    console.log(textExample);
    console.log('finish fetch file');
    return textExample;
  };

  handleVisualize = () => {
    console.log('initialize app attempt');
    console.log('finish handleVisualize');
  };

  render() {
    console.log('start render add css');
    const file = this.fetchFile();
    console.log('finish add css');
    return (
      <div className="visualize-container">
        <button className="btn btn-success"
                style={{marginLeft: 50}}
                onClick={this.handleVisualize.bind(this)}>
          Visualize</button>
          <Graph graph={file}/>
       </div>
    );
  }
}

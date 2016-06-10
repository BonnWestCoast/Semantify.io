import React, {Component} from 'react';
import Graph from './Graph';
import * as filee from './example.json';

export default class Visualizer extends Component {
  state = {
    file: {},
    isShown: false
  };

  fetchFile = () => {
    console.log('start fetch file');
    const textExample = filee;
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

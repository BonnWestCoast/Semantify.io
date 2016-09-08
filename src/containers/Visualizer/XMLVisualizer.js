import React, {Component, PropTypes} from 'react';
import { asyncConnect } from 'redux-async-connect';
import {connect} from 'react-redux';
import { renderXML } from './xmlvis/renderXML';
import { loadXML } from '../../redux/modules/visualizer';

/**
 * Class for visualizing XML files in a tree structure
 * Created by akorovin on 13.07.2016.
 */

@asyncConnect([{
  promise: ({store: {dispatch}}) => {
    return dispatch(loadXML());
  }
}])
@connect(
  state => ({data: state.info.data}),
  {loadXML})
export default class XMLVisualizer extends Component {
  static propTypes = {
    data: PropTypes.object,
    loadXML: PropTypes.func.isRequired
  };

  componentDidMount() {
    const {data} = this.props;
    console.log(data);
    renderXML('.xml-div', data.message, [], []);
  }

  render() {
    return (
      <div className="xml-div"></div>
    )
  }
}

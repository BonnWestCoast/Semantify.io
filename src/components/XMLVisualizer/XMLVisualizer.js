/**
 * Class for visualizing XML files in a tree structure
 * Created by akorovin on 13.07.2016.
 * Modified by Alexey Karpov.
 */

import React, {Component, PropTypes} from 'react'
import { renderXML } from './xmlvis/renderXML'

export default class XMLVisualizer extends Component {
  static propTypes = {
    xml: PropTypes.string,
  }

  state = {
    error: null,
  }

  componentDidMount() {
    const { xml } = this.props
    try {
      renderXML('.xml-div', xml, [], [])
    } catch (err) {
      this.setState({ error: 'Error while parsing XML' }) // eslint-disable-line
    }
  }

  render() {
    return (
      <div className="xml-div">{this.state.error}</div>
    )
  }
}

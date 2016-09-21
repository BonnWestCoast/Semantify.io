/**
 * Class for visualizing XML files in a tree structure
 * Created by akorovin on 13.07.2016.
 * Modified by Alexey Karpov.
 */

import React, {Component, PropTypes} from 'react'
import { renderXML } from './xmlvis/renderXML'

export default class XMLVisualizer extends Component {
  static propTypes = {
    xml: PropTypes.strings,
  }

  componentDidMount() {
    const { xml } = this.props
    renderXML('.xml-div', xml, [], [])
  }

  render() {
    return (
      <div className="xml-div"></div>
    )
  }
}

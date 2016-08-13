/**
 * Created by akorovin on 12.08.2016.
 */

import React, {Component, PropTypes} from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap';

/**
 * Component for rendering list of ontologies
 */
export default class OntologyList extends Component {
  static propTypes = {
    list: PropTypes.array,
    chosenOntology: PropTypes.string
  };

  constructor(props) {
    super(props);
    // TODO: probably anti-pattern
    this.state = {chosenOntology: props.chosenOntology};
  }

  /**
   * Changing state when selecting item in dropdown
   * @param event
   * @param value
     */
  onSelect = (event, value) => {
    this.setState({chosenOntology: value});
  };

  render() {
    return (
      <DropdownButton id="ontologyListId"
                      title={this.state.chosenOntology}>
        {
          this.props.list.map(it => {
            return <MenuItem href="#"
                             onSelect={this.onSelect}
                             className="ontology-list-el"
                             eventKey={it}
                             key={it}>{it}</MenuItem>
          })
        }
      </DropdownButton>
    )
  }
}

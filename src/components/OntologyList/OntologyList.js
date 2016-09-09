/**
 * Created by akorovin on 12.08.2016.
 */

import React, {Component, PropTypes} from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap';
import {loadOntologyText} from 'redux/modules/ontology';
import {connect} from 'react-redux';

/**
 * Component for rendering list of ontologies
 */
@connect(
  state => ({
    chosenOntology: state.ontologyList.chosenOntology
  }),
  {loadOntologyText}
)
export default class OntologyList extends Component {
  static propTypes = {
    list: PropTypes.array,
    chosenOntology: PropTypes.string,
    loadOntologyText: PropTypes.func.isRequired,
    defaultMessage: PropTypes.string
  };

  static defaultProps = {
    defaultMessage: 'Please Choose Ontology'
  }

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
    // TODO: dispatch action to change state
    console.log(value);
    this.setState({chosenOntology: value});
    this.props.loadOntologyText();
  };

  render() {
    return (
      <DropdownButton id="ontologyListId"
                      title={this.state.chosenOntology !== '' ? this.state.chosenOntology : this.props.defaultMessage}>
        {
          this.props.list.map(it => {
            return (
              <MenuItem href="#"
                        onSelect={this.onSelect}
                        className="ontology-list-el"
                        eventKey={it}
                        key={it}>{it}</MenuItem>
            )
          })
        }
      </DropdownButton>
    )
  }
}

/**
 * Created by akorovin on 12.08.2016.
 */

import React, {Component, PropTypes} from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap';
import {loadOntologyText} from 'redux/modules/ontology';
import {changeCurrentOntology} from 'redux/modules/ontologyList';
import {connect} from 'react-redux';

/**
 * Component for rendering list of ontologies
 */
@connect(
  state => ({
    chosenOntology: state.ontologyList.chosenOntology
  }),
  {loadOntologyText, changeCurrentOntology}
)
export default class OntologyList extends Component {
  static propTypes = {
    list: PropTypes.array,
    chosenOntology: PropTypes.string,
    loadOntologyText: PropTypes.func.isRequired,
    changeCurrentOntology: PropTypes.func.isRequired
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
    // TODO: dispatch action to change state
    console.log(value);
    this.props.changeCurrentOntology(value);
    // this.setState({chosenOntology: value});
    this.props.loadOntologyText(value);
  };

  render() {
    return (
      <DropdownButton id="ontologyListId"
                      title={this.props.chosenOntology !== '' ? this.props.chosenOntology : 'Please Choose Ontology'}>
        {
          this.props.list.map(it => {
            return (
              <MenuItem href="#"
                        onSelect={this.onSelect}
                        className="ontology-list-el"
                        eventKey={it.id}
                        key={it.id}>{it.name}</MenuItem>
            )
          })
        }
      </DropdownButton>
    )
  }
}

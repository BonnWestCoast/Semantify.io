/**
 * Created by akorovin on 12.08.2016.
 */

import React, {Component, PropTypes} from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap';

export default class OntologyList extends Component {
  static propTypes = {
    list: PropTypes.array
  };

  render() {
    return (
      <DropdownButton id="ontologyListId" title="List of ontologies">
        {
          this.props.list.map(it => {
            return <MenuItem href="#" className="ontology-list-el" key={it}>{it}</MenuItem>
          })
        }
      </DropdownButton>
    )
  }
}

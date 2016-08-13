/**
 * Created by akorovin on 12.08.2016.
 */

import React, {Component, PropTypes} from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap';

export default class OntologyList extends Component {
  static propTypes = {
    list: PropTypes.array
  };

  static componentWillReceiveProps(nextProps) {
    console.log('olo');
  }

  render() {
    console.log(this.props);
    return (
      <DropdownButton id="ontologyList" title="List of ontologies">
        {
          this.props.list.map(it => {
            console.log(it)
            return <MenuItem href="#" className="ontology-list-el" key={it}>{it}</MenuItem>
          })
        }
      </DropdownButton>
    )
  }
}

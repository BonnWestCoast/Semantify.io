/**
 * Created by akorovin on 12.08.2016.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {renderIntoDocument} from 'react-addons-test-utils';
import { expect} from 'chai';
import OntologyList from 'containers/Ontology/OntologyList';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import createStore from 'redux/create';
import ApiClient from 'helpers/ApiClient';
const client = new ApiClient();

describe('OntologyList', () => {
  const mockStore = {
    ontologyList: {
      loadOntologyList: () => {},
      chosenOntology: 'ontology1',
      list: ['ontology1', 'ontology2', 'ontology3'],
      loaded: true,
      loading: false
    }
  };
  const store = createStore(browserHistory, client, mockStore);
  const renderer = renderIntoDocument(
    <Provider store={store} key="provider">
      <OntologyList/>
    </Provider>
  );
  const dom = ReactDOM.findDOMNode(renderer);

  it('should render correctly', () => {
    return expect(renderer).to.be.ok;
  });

  it('should render with correct value', () => {
    const children = dom.getElementsByClassName('ontologies-list-el').length;
    expect(children).to.equal(mockStore.ontologyList.list.length);
  });
});

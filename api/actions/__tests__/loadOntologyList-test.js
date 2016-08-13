/**
 * Created by akorovin on 13.08.2016.
 */

import {expect} from 'chai';
import loadOntologyList from '../ontologies/loadOntologyList';

describe('loadOntologyList', () => {
  it('loads ontologies list correctly', () => {
    return loadOntologyList().then(data => {
      let ontology = data.message;
      expect(ontology).to.deep.equal(['ontology1', 'ontology2', 'ontology3']);
    });
  });
});
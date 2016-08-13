/**
 * Created by akorovin on 13.08.2016.
 */

import {expect} from 'chai';
import loadOntologyList from '../ontology/loadOntologyList';

describe('loadOntologyList', () => {
  it('loads ontology list correctly', () => {
    return loadOntologyList().then(data => {
      let ontology = data.message;
      expect(ontology).to.deep.equal(['ontology1', 'ontology2', 'ontology3']);
    });
  });
});
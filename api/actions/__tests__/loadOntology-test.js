/**
 * Created by akorovin on 10.08.2016.
 */

import {expect} from 'chai';
import loadOntology from '../visualizer/loadOntology';

describe('loadOntology', () => {
  it('loads ontologies with correct structure', () => {
    return loadOntology().then(data => {
      let ontology = data.message;
      expect(ontology).have.keys(['edges', 'root', 'toFromLookup']);
    });
  });
});
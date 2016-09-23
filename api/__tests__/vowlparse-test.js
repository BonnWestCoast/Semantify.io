import VowlParser from '../VowlParser';
import {expect} from 'chai';
const fs = require('fs');

describe('parseVowl', function() {
  it('parses vowl and creates ontologies', () => {
    const parser = new VowlParser();
    const fileName = './../../fixtures/owl/ontologyFile.owl';
    const ontology = fs.readFileSync(__dirname + fileName).toString();

    const res = parser.parse(ontology,
      () => {
        console.log('FINISHED');
        expect(res).to.deep.equal('Lol');
      });
  });
});

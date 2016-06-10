import VowlParser from '../VowlParser';
import {expect} from 'chai';

describe('parseVowl', () => {
  it('parses vowl and creates ontology', () => {
    const parser = new VowlParser();
    const res = parser.parse('./../fixtures/owl/ontologyFile.owl',
      () => {
        console.log('FINISHED');
        expect(res).to.deep.equal('Lol');
      });

  });
});

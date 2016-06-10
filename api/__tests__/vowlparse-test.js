import VowlParser from '../VowlParser';
import {expect} from 'chai';

describe('parseVowl', () => {
  it('parses vowl and creates ontology', () => {
    console.log('start test');
    const parser = new VowlParser();
    const res = parser.parse('./../fixtures/owl/ontologyFile.owl',
      () => {});
    //expect(res).to.deep.equal('Lol');
  });
});

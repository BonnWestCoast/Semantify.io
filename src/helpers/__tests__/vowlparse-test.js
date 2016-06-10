import VowlParser from '../VowlParser';
import {expect} from 'chai';

describe('parseVowl', () => {
  before(() => {
    fixture.setBase('fixtures');
  });

  beforeEach(function(){
    this.result = fixture.load('example.json');
  });

  afterEach(() => {
    fixture.cleanup();
  });

  it('gets nodes from vowl file', () => {
    let res = fixture.load('example.json');
    //console.log(res);
    const parser = new VowlParser();
    const nodes = parser.getNodes(res);
    expect(nodes).to.deep.equal({});
  });
});

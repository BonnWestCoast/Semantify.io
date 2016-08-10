/**
 * Created by akorovin on 13.07.2016.
 */

import VowlParser from '../../VowlParser';
const fs = require('fs');

export default function loadOntology() {
  return new Promise((resolve) => {
    const parser = new VowlParser();
    const fileName = '../../../../fixtures/owl/ontologyFile.owl';
    const ontology = fs.readFileSync(__dirname + fileName).toString();

    parser.parse(ontology,
      (data) => {
        resolve({
          message: data,
          time: Date.now()
        });
      });
  });
}

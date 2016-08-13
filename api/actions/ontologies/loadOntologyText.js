/**
 * Created by akorovin on 12.08.2016.
 */

const fs = require('fs');

export default function loadOntologyText() {
  return new Promise((resolve) => {
    const fileName = '../../../../fixtures/owl/ontologyFile.owl';
    const ontology = fs.readFileSync(__dirname + fileName).toString();

    resolve({
      message: ontology,
      time: Date.now()
    });
  });
}

/**
 * Created by akorovin on 12.08.2016.
 */

const fs = require('fs');

export default function loadOntologyText() {
  return new Promise((resolve) => {
    const ontology = fs.readFileSync('./fixtures/owl/ontologyFile.owl').toString();

    resolve({
      message: ontology,
      time: Date.now()
    });
  });
}

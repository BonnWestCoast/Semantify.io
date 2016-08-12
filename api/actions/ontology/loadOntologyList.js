/**
 * Created by akorovin on 12.08.2016.
 */

const fs = require('fs');

export default function loadOntologyList() {
  return new Promise((resolve) => {
    const testData = ['ontology1', 'ontology2', 'ontology3'];
    
    resolve({
      message: testData,
      time: Date.now()
    });
  });
}

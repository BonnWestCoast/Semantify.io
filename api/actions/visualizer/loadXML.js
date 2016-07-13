/**
 * Created by akorovin on 13.07.2016.
 */
const fs = require('fs');
const path = require('path');

export default function loadXML() {
  return new Promise((resolve) => {
    const filePath = path.join(__dirname, '../../../fixtures/xml/Opc.Ua.NodeSet2.xml');
    const ontology = fs.readFileSync(filePath).toString();

    resolve({
      message: ontology,
      time: Date.now()
    });
  });
}
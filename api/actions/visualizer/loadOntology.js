/**
 * Created by akorovin on 13.07.2016.
 */

export default function loadOntology() {
  return new Promise((resolve) => {
    //TODO: test this file
    // const path = '../fixtures/ontologyFile.owl';
    // const ontology = fs.readFileSync(__dirname + path).toString();
    // const ontObj = JSON.parse(ontology);
    // function send(triples) {
    //   res.json(triples);
    // }
    //
    // const parser = new VowlParser();
    // parser.parse(ontObj, send);
    
    resolve({
      message: 'ontology',
      time: Date.now()
    });
  });
}

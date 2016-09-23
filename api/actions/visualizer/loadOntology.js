/**
 * Created by akorovin on 13.07.2016.
 */

import VowlParser from '../../VowlParser'
const request = require('superagent');

export default function loadOntology(req) {
  return new Promise((resolve, reject) => {
    const id = req.body.ontologyId;
    const parser = new VowlParser();
    request
      .get('http://localhost:8080/rest/ontologies/visualizer/' + id)
      .end(function(err, res){
        if (err ||!res.ok) {
          console.log(res.body.data);
          reject('Error when loading visualizer: ' + err);
        }
        try {
          let ontology = res.body.data.toString();

          parser.parse(ontology,
            (data) => {
              resolve({
                message: data,
                time: Date.now()
              });
            });
        }
        catch(err) {
          reject('Error with visualizer: ' + err)
        }
      });
  });
}

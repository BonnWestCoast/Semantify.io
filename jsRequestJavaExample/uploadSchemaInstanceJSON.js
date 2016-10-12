/* Little JS script to upload XML files (Schema and Instance) to the Java API Rest */

var request = require('request');
var fs = require('fs');

var schema = fs.readFileSync('opc_ua/UANodeSet.xsd', 'utf8');
var instance = fs.readFileSync('opc_ua/Opc.Ua.NodeSet2.test.xml', 'utf8');

var url = 'http://localhost:8080/rest/ontologies'

var requestString = {
    "schema": schema,
    "instance": instance,
    "ontName": "name_of_ontology_here",
    "ontFormat": "N-TRIPLE",
    //"ontFormat": "RDF/XML-ABBREV"
}

var options = {
    url: url,
    method: 'post',
    json: true,
    headers: { "content-type": "application/json" },
    body: requestString
}

req = request( options , function (error, response, body) {

            if (!error && response.statusCode == 200) {
                console.log(body);
                console.log('ok')
            } else {
                console.log(response);
                //console.log(response.statusCode);
                console.log('error')
            }
        }
)
